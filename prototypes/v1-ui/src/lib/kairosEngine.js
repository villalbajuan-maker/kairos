const FREE_ACCESS_CODES = new Set(['KAIROS50', 'PASTOR50', 'DISCERN']);

const verseBundles = {
  peace: [
    'Colossians 3:15 — Let the peace of Christ rule in your hearts.',
    'Philippians 4:6-7 — Present your requests to God, and his peace will guard your heart and mind.',
    'John 14:27 — Peace I leave with you; my peace I give you.',
  ],
  wisdom: [
    'James 1:5 — If any of you lacks wisdom, ask God, who gives generously.',
    'Proverbs 3:5-6 — Trust in the Lord with all your heart, and he will make your paths straight.',
    'Psalm 32:8 — I will instruct you and teach you in the way you should go.',
  ],
  fruit: [
    'Galatians 5:22-23 — The fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, and self-control.',
    'Matthew 7:16 — By their fruit you will recognize them.',
    'John 15:4-5 — Remain in me and you will bear much fruit.',
  ],
  commitment: [
    'Amos 3:3 — Can two walk together unless they have agreed to do so?',
    '2 Corinthians 6:14 — Do not be unequally yoked.',
    'Ephesians 5:1-2 — Walk in the way of love.',
  ],
};

function buildMessage(role, text) {
  return {
    id: `${role}-${Math.random().toString(36).slice(2, 10)}`,
    role,
    text,
  };
}

export const INITIAL_SESSION = createInitialSession();

export function resetSession() {
  return createInitialSession();
}

function createInitialSession() {
  return {
    phase: 'phase1_listen',
    gateUnlocked: false,
    paymentError: '',
    freeformAttempts: 0,
    decision: '',
    category: '',
    notes: {
      situation: '',
      feelings: '',
      desires: '',
      fears: '',
      scriptureReflection: '',
      prayerReflection: '',
      clarityState: '',
      decisionStatement: '',
      actionPlan: '',
      executionResult: '',
    },
    messages: [
      buildMessage(
        'assistant',
        "Bring one decision. You do not need clarity yet. I'll help you move from ambiguity to a concrete, prayerful next step."
      ),
      buildMessage(
        'assistant',
        'Start by describing your situation in your own words. What feels unresolved right now?'
      ),
    ],
  };
}

export function getCurrentStep(session) {
  return session.phase;
}

export function getProgressLabel(step) {
  const labels = {
    phase1_listen: 'Phase 1 · Define',
    phase1_confirm: 'Phase 1 · Confirm',
    paywall: 'Unlock',
    phase2_feelings: 'Phase 2 · Separate',
    phase3_category: 'Phase 3 · Seek',
    phase3_reflect: 'Phase 3 · Reflect',
    phase4_collect: 'Phase 4 · Clarify',
    phase5_decide: 'Phase 5 · Decide',
    phase6_execute: 'Phase 6 · Execute',
    complete: 'Completed',
  };

  return labels[step] || 'Kairos';
}

export function getStepViewState(session) {
  switch (session.phase) {
    case 'phase1_listen':
      return {
        type: 'input',
        title: 'Describe the situation',
        placeholder: 'Write or paste the situation as you are living it.',
        summary: 'We are turning noise into a single decision.',
      };
    case 'phase1_confirm':
      return {
        type: 'options',
        title: 'Choose the clearest decision statement',
        summary: 'Do not solve it yet. Just name it precisely.',
        options: [
          { value: 'confirm_decision', label: session.decision, hint: 'This is the decision I need to make.' },
          { value: 'retry_decision', label: 'None of these yet', hint: 'I need to refine it again.' },
        ],
      };
    case 'paywall':
      return {
        type: 'paywall',
        title: 'Unlock the full discernment process',
        summary: 'The free part ends once the decision is defined.',
      };
    case 'phase2_feelings':
      return {
        type: 'input',
        title: 'Separate what is inside you',
        placeholder:
          'What do you feel?\nWhat do you want?\nWhat do you fear?\nWrite them in separate lines.',
        rows: 6,
        summary: 'Emotion explains resistance. It does not decide for you.',
      };
    case 'phase3_category':
      return {
        type: 'options',
        title: 'Choose the lens for scripture and prayer',
        summary: 'We move from analysis into intentional spiritual search.',
        options: [
          { value: 'peace', label: 'Peace', hint: 'What is ruling your heart?' },
          { value: 'wisdom', label: 'Wisdom', hint: 'What guidance is God giving?' },
          { value: 'fruit', label: 'Fruit', hint: 'What is this producing in your life?' },
          { value: 'commitment', label: 'Commitment', hint: 'What kind of covenant or alignment is present?' },
        ],
      };
    case 'phase3_reflect':
      return {
        type: 'input',
        title: 'Reflect on scripture and prayer',
        placeholder:
          'What does the text say?\nWhat do you sense God may be highlighting?\nWhat happened when you prayed specifically about this decision?',
        rows: 7,
        summary: 'The system guides the process, but God remains the source of direction.',
      };
    case 'phase4_collect':
      return {
        type: 'options',
        title: 'Name the clarity that is emerging',
        summary: 'We are reducing ambiguity, not inventing a new answer.',
        options: [
          { value: 'release', label: 'I sense I should let go / close this', hint: 'Clarity is pointing toward release.' },
          { value: 'remain', label: 'I sense I should remain / keep building', hint: 'Clarity is pointing toward staying.' },
          { value: 'wait', label: 'I should wait and keep seeking', hint: 'There is not enough clarity to act yet.' },
        ],
      };
    case 'phase5_decide':
      return {
        type: 'input',
        title: 'Turn clarity into a decision and action',
        placeholder:
          'State your decision clearly.\nThen write the concrete action you will take and when you will do it.',
        rows: 5,
        summary: 'Clarity without action becomes refined avoidance.',
      };
    case 'phase6_execute':
      return {
        type: 'options',
        title: 'Confirm execution',
        summary: 'Execution and steadiness are the final proof points.',
        options: [
          { value: 'executed', label: 'I did it', hint: 'The action already happened.' },
          { value: 'not_executed', label: 'I did not do it yet', hint: 'We need to identify what blocked execution.' },
        ],
      };
    case 'complete':
      return {
        type: 'options',
        title: 'Session complete',
        summary: 'Kairos is built around one decision at a time.',
        options: [{ value: 'restart', label: 'Start a new decision', hint: 'Open a fresh Kairos session.' }],
      };
    default:
      return {
        type: 'input',
        title: 'Kairos',
        placeholder: '',
        summary: '',
      };
  }
}

export function submitFreeform(session, input) {
  let next = appendUserMessage(session, input);

  switch (session.phase) {
    case 'phase1_listen':
      return handlePhase1(next, input);
    case 'phase2_feelings':
      return handlePhase2(next, input);
    case 'phase3_reflect':
      return handlePhase3Reflect(next, input);
    case 'phase5_decide':
      return handlePhase5(next, input);
    default:
      return next;
  }
}

export function chooseOption(session, value) {
  let next = appendUserMessage(session, optionEcho(session.phase, value));

  if (value === 'restart') {
    return resetSession();
  }

  switch (session.phase) {
    case 'phase1_confirm':
      if (value === 'confirm_decision') {
        return withAssistant(
          { ...next, phase: 'paywall' },
          'Your decision is now defined. The next part is the full guided process for this specific decision.'
        );
      }

      return withAssistant(
        { ...next, phase: 'phase1_listen' },
        'Good. Try again in one sentence. What exactly do you need to decide?'
      );
    case 'phase3_category':
      return handleCategoryChoice(next, value);
    case 'phase4_collect':
      return handleClarityChoice(next, value);
    case 'phase6_execute':
      return handleExecutionChoice(next, value);
    case 'complete':
      return resetSession();
    default:
      return next;
  }
}

export function activatePaidAccess(session, payload) {
  if (session.phase !== 'paywall') return session;

  if (payload.mode === 'paid') {
    return withAssistant(
      { ...session, phase: 'phase2_feelings', gateUnlocked: true, paymentError: '' },
      'Access unlocked. Before seeking direction, separate what you feel, what you want, and what you fear.'
    );
  }

  if (payload.mode === 'code') {
    if (!FREE_ACCESS_CODES.has(payload.code.toUpperCase())) {
      return { ...session, paymentError: 'That code is not valid for this preview build.' };
    }

    return withAssistant(
      { ...session, phase: 'phase2_feelings', gateUnlocked: true, paymentError: '' },
      'Code accepted. Access unlocked. Before seeking direction, separate what you feel, what you want, and what you fear.'
    );
  }

  return session;
}

function handlePhase1(session, input) {
  const nextAttempts = session.freeformAttempts + 1;
  const suggestion = deriveDecisionSuggestion(input);

  if (!suggestion && nextAttempts < 2) {
    return withAssistant(
      { ...session, freeformAttempts: nextAttempts, notes: { ...session.notes, situation: input } },
      'That describes how things feel, but not the decision yet. What exactly do you need to decide?'
    );
  }

  const decision = suggestion || 'Should I let this relationship go, or should I continue in it?';

  return withAssistant(
    {
      ...session,
      phase: 'phase1_confirm',
      freeformAttempts: nextAttempts,
      decision,
      notes: { ...session.notes, situation: input },
    },
    `Based on what you shared, the clearest decision sounds like:\n\n"${decision}"\n\nChoose it if that is accurate, or refine it once more.`
  );
}

function handlePhase2(session, input) {
  const notes = parseFeelings(input);

  return withAssistant(
    {
      ...session,
      phase: 'phase3_category',
      notes: { ...session.notes, ...notes },
    },
    "Good. Those internal forces are now visible. They matter, but they do not get to decide. Let's move into scripture and prayer with intention."
  );
}

function handleCategoryChoice(session, value) {
  const bundle = verseBundles[value] || [];
  const intro = [
    `We'll work through the lens of ${capitalize(value)}.`,
    'Read these passages slowly:',
    ...bundle.map((verse) => `• ${verse}`),
    '',
    'After reading and praying, tell me what the text says, what stands out, and what you sense may be taking shape in you.',
  ].join('\n');

  return withAssistant(
    { ...session, phase: 'phase3_reflect', category: value },
    intro
  );
}

function handlePhase3Reflect(session, input) {
  return withAssistant(
    {
      ...session,
      phase: 'phase4_collect',
      notes: { ...session.notes, scriptureReflection: input, prayerReflection: input },
    },
    'You have done the searching work. Now reduce the ambiguity. Which option best matches the clarity that is emerging?'
  );
}

function handleClarityChoice(session, value) {
  const clarityMap = {
    release: 'I sense I should release or close this.',
    remain: 'I sense I should remain and keep building this.',
    wait: 'I do not yet have enough clarity to act.',
  };

  return withAssistant(
    {
      ...session,
      phase: 'phase5_decide',
      notes: { ...session.notes, clarityState: clarityMap[value] },
    },
    value === 'wait'
      ? 'Then do not force a false close. Write the decision you are making about waiting, plus the next concrete spiritual step and when you will do it.'
      : 'State the decision clearly. Then write the concrete action you will take and when it will happen.'
  );
}

function handlePhase5(session, input) {
  return withAssistant(
    {
      ...session,
      phase: 'phase6_execute',
      notes: { ...session.notes, actionPlan: input, decisionStatement: input },
    },
    'Your decision is now explicit. The last part is execution. When the moment comes, return and confirm whether the action actually happened.'
  );
}

function handleExecutionChoice(session, value) {
  if (value === 'executed') {
    return withAssistant(
      {
        ...session,
        phase: 'complete',
        notes: { ...session.notes, executionResult: 'Executed' },
      },
      'You carried it through. Hold the line unless genuinely new information appears. What you feel afterward does not automatically invalidate what you discerned.'
    );
  }

  return withAssistant(
    {
      ...session,
      phase: 'complete',
      notes: { ...session.notes, executionResult: 'Not executed yet' },
    },
    'Execution did not happen yet. That does not erase the work. The next real question is whether something changed in reality or whether resistance returned.'
  );
}

function deriveDecisionSuggestion(input) {
  const normalized = input.toLowerCase();

  if (
    normalized.includes('relationship') ||
    normalized.includes('dating') ||
    normalized.includes('boyfriend') ||
    normalized.includes('girlfriend') ||
    normalized.includes('pareja') ||
    normalized.includes('relación')
  ) {
    return 'Should I end this relationship, or should I continue in it?';
  }

  if (normalized.includes('job') || normalized.includes('work') || normalized.includes('renunciar')) {
    return 'Should I stay in this role, or should I leave it?';
  }

  if (normalized.includes('move') || normalized.includes('city') || normalized.includes('mud')) {
    return 'Should I make this move, or should I stay where I am?';
  }

  return '';
}

function parseFeelings(input) {
  const lines = input
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length >= 3) {
    return {
      feelings: lines[0],
      desires: lines[1],
      fears: lines[2],
    };
  }

  return {
    feelings: input,
    desires: '',
    fears: '',
  };
}

function appendUserMessage(session, input) {
  return {
    ...session,
    messages: [...session.messages, buildMessage('user', input)],
    paymentError: '',
  };
}

function withAssistant(session, text) {
  return {
    ...session,
    messages: [...session.messages, buildMessage('assistant', text)],
  };
}

function optionEcho(phase, value) {
  const labels = {
    confirm_decision: 'That is the right decision statement.',
    retry_decision: 'I need to refine the decision again.',
    peace: 'Peace',
    wisdom: 'Wisdom',
    fruit: 'Fruit',
    commitment: 'Commitment',
    release: 'I should let go / close this.',
    remain: 'I should remain / keep building this.',
    wait: 'I should wait and keep seeking.',
    executed: 'I did it.',
    not_executed: 'I did not do it yet.',
  };

  return labels[value] || value || phase;
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
