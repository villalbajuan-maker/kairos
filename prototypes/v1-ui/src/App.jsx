import { useEffect, useMemo, useState } from 'react';
import {
  INITIAL_SESSION,
  getCurrentStep,
  getProgressLabel,
  getStepViewState,
  submitFreeform,
  chooseOption,
  activatePaidAccess,
  resetSession,
} from './lib/kairosEngine';

function App() {
  const [session, setSession] = useState(INITIAL_SESSION);
  const [draft, setDraft] = useState('');
  const [codeInput, setCodeInput] = useState('');

  const step = useMemo(() => getCurrentStep(session), [session]);
  const view = useMemo(() => getStepViewState(session), [session]);

  useEffect(() => {
    if (view.prefillInput) {
      setDraft(view.prefillInput);
    }
  }, [view.prefillInput]);

  const sendFreeform = () => {
    if (!draft.trim()) return;
    const nextSession = submitFreeform(session, draft.trim());
    setSession(nextSession);
    setDraft('');
  };

  const sendChoice = (value) => {
    setSession(chooseOption(session, value));
  };

  const unlockPaid = () => {
    setSession(activatePaidAccess(session, { mode: 'paid' }));
  };

  const unlockCode = () => {
    if (!codeInput.trim()) return;
    setSession(activatePaidAccess(session, { mode: 'code', code: codeInput.trim() }));
    setCodeInput('');
  };

  return (
    <div className="app-shell">
      <aside className="side-panel">
        <div>
          <p className="eyebrow">Kairos</p>
          <h1>Discern. Decide. Act.</h1>
          <p className="lede">
            A guided decision session that moves from ambiguity toward a concrete,
            prayerful next step.
          </p>
        </div>

        <div className="summary-card">
          <p className="summary-label">Current phase</p>
          <p className="summary-value">{getProgressLabel(step)}</p>
          <p className="summary-note">{view.summary}</p>
        </div>

        <div className="summary-card">
          <p className="summary-label">Decision</p>
          <p className="summary-value decision-preview">
            {session.decision || 'Not defined yet'}
          </p>
        </div>

        <div className="summary-card compact">
          <button className="secondary-button" onClick={() => setSession(resetSession())}>
            Start over
          </button>
        </div>
      </aside>

      <main className="main-panel">
        <header className="session-header">
          <div>
            <p className="eyebrow">Guided Session</p>
            <h2>{view.title}</h2>
          </div>
          <div className="phase-chip">{getProgressLabel(step)}</div>
        </header>

        <section className="conversation-card">
          <div className="message-list">
            {session.messages.map((message) => (
              <article
                key={message.id}
                className={`message ${message.role === 'assistant' ? 'assistant' : 'user'}`}
              >
                <p>{message.text}</p>
              </article>
            ))}
          </div>

          {view.type === 'paywall' && (
            <div className="action-panel">
              <div className="paywall-card">
                <p className="paywall-title">Unlock this decision</p>
                <p className="paywall-copy">
                  Continue with the full discernment process for this decision or activate
                  access with a code.
                </p>
                <div className="paywall-actions">
                  <button className="primary-button" onClick={unlockPaid}>
                    Take this decision — $9
                  </button>
                  <div className="code-row">
                    <input
                      value={codeInput}
                      onChange={(event) => setCodeInput(event.target.value)}
                      placeholder="Enter code"
                    />
                    <button className="secondary-button" onClick={unlockCode}>
                      Use code
                    </button>
                  </div>
                  {session.paymentError && (
                    <p className="error-copy">{session.paymentError}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {view.type === 'options' && (
            <div className="action-panel">
              {view.options.map((option) => (
                <button
                  key={option.value}
                  className="option-button"
                  onClick={() => sendChoice(option.value)}
                >
                  <span>{option.label}</span>
                  {option.hint && <small>{option.hint}</small>}
                </button>
              ))}
            </div>
          )}

          {view.type === 'input' && (
            <div className="action-panel">
              <textarea
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder={view.placeholder}
                rows={view.rows || 4}
              />
              <button className="primary-button" onClick={sendFreeform}>
                Continue
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
