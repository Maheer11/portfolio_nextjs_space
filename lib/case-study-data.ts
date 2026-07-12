export const ketapayCaseStudy = {
  title: 'Ketapay',
  subtitle: 'Escrow Platform for Nigerian Payments',
  stage: 'Pre-Launch',
  status: 'Building in Public',

  problem: `Nigerian businesses lose money to payment fraud. A buyer gets goods but doesn't pay. A seller ships products but gets scammed. We built Ketapay to secure both sides—hold the buyer's money safely until everyone confirms the transaction is complete.`,

  myRole: [
    {
      title: 'QA Testing',
      description: 'Built test cases for payment flows, escrow logic, and edge cases. Caught issues before they cost real money.',
    },
    {
      title: 'UI/UX Testing',
      description: 'Tested user flows end-to-end. Made sure a seller could actually use the app without confusion. Sometimes design looked good but felt clunky in practice.',
    },
    {
      title: 'System Design',
      description: 'Understood the escrow transaction flow—how money moves, how states change, what happens if a payment fails halfway. This is where the reliability matters most.',
    },
  ],

  // flipFrom/flipTo are scannable summaries extracted verbatim-adjacent from `learned`.
  challenges: [
    {
      what: 'Tool Selection Misconception',
      flipFrom: 'more complex tools = better',
      flipTo: 'right tool for the job',
      learned: `I initially thought more complex tools = better solutions. Got challenged to use simpler, more appropriate tools. Learned that using Supabase well beats using Firebase poorly. Right tool for the job > fancier tool.`,
      impact: 'Faster iteration, clearer code, easier debugging.',
    },
    {
      what: 'Self-Directed Learning',
      flipFrom: 'wait for training and docs',
      flipTo: 'work backwards from problems',
      learned: `Couldn't wait for training or documentation. Used YouTube, AI (Claude, ChatGPT), reading open issues on GitHub. Worked backwards from problems—"how do I test escrow logic?"—rather than learning features.`,
      impact: 'Became independent. No longer blocked waiting for answers.',
    },
    {
      what: 'Understanding Fintech Complexity',
      flipFrom: 'payments are just "send money"',
      flipTo: 'edge cases first, not last',
      learned: `Payments aren't just "send money." There are race conditions, timeouts, retries, failed transactions, partial refunds. One wrong edge case = users lose money. Testing here is not optional.`,
      impact: 'Now think about reliability and edge cases first, not last.',
    },
  ],

  keyTakeaway: `Ketapay taught me that product thinking > just coding. QA caught bugs before launch. Understanding system design meant I could spot issues in architecture meetings. The biggest value wasn't in the code I wrote—it was in asking "what if this fails?"`,

  currentStatus: `App is built and ready. Website is live. We're working through the launch sequence. This is where the real learning happens—talking to early users, handling the unexpected, iterating fast.`,

  whyItsInMyPortfolio: `Ketapay isn't a finished project to brag about. It's where I learned that building matters more than the outcome. It's messy, it's ongoing, and that's the point. It shows I can handle ambiguity, learn fast, and think beyond "did this feature work?"`,
};

export const learningsAndPrinciples = [
  {
    principle: 'Right Tool for the Problem',
    description: `I used to chase the shiniest framework. Now I ask: "What's the simplest tool that solves this?" TypeScript over JavaScript when types matter. Supabase over complex backend when I need quick iteration. Sometimes the answer is just a shell script.`,
    example: 'At OneStop, I refactored to TypeScript. At Ketapay, I stuck with what the team knew rather than introducing new tools mid-launch.',
  },
  {
    principle: 'Test the User Path, Not Just the Code',
    description: `A function works. But does the user know how to use it? QA for me isn't automated tests (though those matter). It's walking through the flow, clicking every button, asking "is this confusing?"`,
    example: 'Built dynamic cart logic that technically worked. Actual users got confused about persistence. Fixed the UX, not the code.',
  },
  {
    principle: 'Learn Backwards from Problems',
    description: `Instead of "let me learn Docker," I asked "how do I deploy this?" Instead of "let me learn system design," I drew the escrow flow and found gaps. Problems pull knowledge, not the other way around.`,
    example: 'Needed to understand JWT. Didn\'t read a course. Built authentication, hit errors, searched those errors, understood JWT through debugging.',
  },
  {
    principle: 'Ambiguity is the Actual Job',
    description: `Most of my time isn't writing code. It's understanding what to build. "Build a secure escrow system" is vague until you map out state transitions. That mapping is the hard part.`,
    example: 'Spent 2 weeks understanding escrow logic before writing a line of code. That was the most valuable 2 weeks.',
  },
];

export const currentWork = {
  focus: 'Ketapay Launch',
  whatImDoing: [
    'Working through final QA before launch',
    'Gathering early user feedback and iterating',
    'Understanding system design at scale (what if we get 10K transactions/day?)',
    'Learning deployment and monitoring (the unsexy but critical part)',
  ],
  learning: [
    'Grokking the System Design Interview (expanding mental models)',
    'Fintech regulations and compliance (context for better design)',
    'How to think about reliability when money is involved',
  ],
  side: 'Exploring small automation projects and reflecting on what I\'ve learned building',
};

export const potentialBlogTopics = [
  {
    title: 'From "More Complex = Better" to "Simple is Powerful"',
    description: 'How I learned to stop chasing frameworks and start matching tools to problems.',
    why: 'Real lesson from your journey. Relatable to other self-taught devs.',
  },
  {
    title: 'QA Testing That Actually Catches Real Bugs (Not Just Clicking Around)',
    description: 'How I think about edge cases in payment systems. Testing strategies for fintech.',
    why: 'Not a common topic. Shows depth. Practical.',
  },
  {
    title: 'Learning Backwards: How I Taught Myself System Design',
    description: 'Building Ketapay taught me more about design than any course. Here\'s the unconventional path.',
    why: 'Honest. Shows that formal learning isn\'t the only way. Inspiring.',
  },
  {
    title: 'The Real Cost of Tool Decisions in Early-Stage Startups',
    description: 'I chose Supabase. Here\'s why. Here\'s what I\'d change. Here\'s what worked.',
    why: 'Practical for people building products, not just side projects.',
  },
  {
    title: 'Why I Transitioned from Zoology to Software Engineering (And Actually Stuck)',
    description: 'The messy, real story. Not inspirational BS. The actual moments where it could have failed.',
    why: 'Unique perspective. People love real, honest career transitions.',
  },
];

export const honestReflection = `
Building Ketapay, I realized I'm not a "write perfect code" engineer. I'm a "understand the problem deeply, ask hard questions, catch things others miss" engineer. Some of my best contributions weren't lines of code—they were "wait, what happens if the payment fails here?" or "this flow is confusing, let me test it with a real person."

The transition from Zoology to Software felt like I had to learn everything. Turns out, that's an advantage. I don't take for granted how things work. I dig into the "why." That's served me well in fintech where getting it wrong costs people money.

I'm not done learning. Not even close. But I'm comfortable learning in public, admitting when I'm wrong, and pivoting when I realize I chose the wrong tool. That's probably more valuable than knowing everything.
`;
