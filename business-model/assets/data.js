/* ============================================================================
   THE ONE FILE YOU EDIT TO ADD WORKSHEETS AND TOOLS
   ----------------------------------------------------------------------------
   Every resource is an object with these fields:

     title  (required)  The name shown on the card.
     kind   (required)  Badge text. Use one of: Worksheet, Template, Canvas,
                        Calculator, Checklist, Playbook, Guide, Tracker.
     desc   (required)  One short line describing what it does.
     file   (optional)  Path to the file, relative to this site folder.
                        e.g. 'worksheets/marketing/positioning.pdf'
     link   (optional)  A URL instead of a file (Google Sheet, Notion doc, app).

   A resource with neither `file` nor `link` renders as "Coming soon" — that is
   the state everything ships in. To publish one:
     1. Drop the file in worksheets/<folder>/
     2. Add the file: '...' line to its entry below
     3. Commit and push. That is the whole process.
   ========================================================================== */

window.BUSINESS_MODEL = {

  /* Brand and page copy — change these to rename the site. */
  brand: {
    name: 'Business Model Toolkit',
    tagline: 'Worksheets and tools for every part of the business',
    heroEyebrow: 'A working model, not a poster',
    heroTitle: 'Every part of the business, built around one person.',
    heroLead: 'Nine functions, one customer at the centre. Click any segment of the model to open the worksheets and tools that make that part of the business work.',
    footerNote: 'Built to be used, printed, marked up, and argued with.'
  },

  /* The centre of the model. */
  center: {
    id: 'customer',
    name: 'Customer',
    icon: 'ic-customer',
    color: '#4B5563',
    tagline: 'The one person every function is accountable to.',
    summary: 'The customer sits at the centre because every other function is downstream of a decision they make. Marketing earns their attention, sales earns their trust, operations keeps the promise, finance keeps it sustainable. Get the customer wrong and the other eight segments are simply efficient at the wrong thing.',
    questions: [
      'Who, specifically, is this for — and who is it not for?',
      'What job are they hiring us to do?',
      'What does the whole experience feel like from their side?',
      'What would make them leave, and what would make them stay?'
    ],
    resources: [
      { title: 'Ideal Customer Profile Worksheet', kind: 'Worksheet', desc: 'Narrow a broad market down to the segment you can actually serve best.' },
      { title: 'Customer Persona Builder', kind: 'Template', desc: 'Turn research into one page a whole team can design against.' },
      { title: 'Jobs-to-be-Done Interview Guide', kind: 'Guide', desc: 'Question script for finding the real job behind the purchase.' },
      { title: 'Customer Journey Map', kind: 'Canvas', desc: 'Map every touchpoint from first awareness to renewal or referral.' },
      { title: 'Voice-of-Customer Log', kind: 'Tracker', desc: 'One place to capture verbatim feedback so patterns become visible.' },
      { title: 'Segment Sizing Calculator', kind: 'Calculator', desc: 'Estimate how many buyers your segment actually contains.' }
    ]
  },

  /* The eight surrounding segments, clockwise from the top. */
  segments: [
    {
      id: 'marketing',
      name: 'Marketing',
      lines: ['Marketing'],
      short: ['Marketing'],
      icon: 'ic-marketing',
      color: '#9B5138',
      folder: 'marketing',
      tagline: 'Earn attention and make a promise worth keeping.',
      summary: 'Marketing decides who you are talking to, what you say to them, and where you say it. Its job is not to be clever — it is to make the right people recognise themselves in your offer and take one step closer.',
      questions: [
        'What do we stand for that a competitor could not claim?',
        'Which channels actually reach our segment, and at what cost?',
        'What is the single message someone should remember?',
        'What does one new customer cost us to acquire?'
      ],
      resources: [
        { title: 'Positioning Statement Worksheet', kind: 'Worksheet', desc: 'Fill-in-the-blank framework for who you serve and why you win.' },
        { title: 'Value Proposition Canvas', kind: 'Canvas', desc: 'Match what you offer to the pains and gains customers named.' },
        { title: 'Channel Scorecard', kind: 'Worksheet', desc: 'Rate every channel on reach, cost, effort, and fit before committing.' },
        { title: 'Content Calendar', kind: 'Template', desc: 'A quarter of planned content on one page, by theme and channel.' },
        { title: 'Campaign Brief', kind: 'Template', desc: 'One page that stops a campaign starting without an objective.' },
        { title: 'Brand Style Guide Starter', kind: 'Guide', desc: 'Colour, type, voice, and logo rules for a business without a design team.' },
        { title: 'CAC & Budget Tracker', kind: 'Calculator', desc: 'Spend per channel against customers acquired, month by month.' }
      ]
    },
    {
      id: 'sales',
      name: 'Sales',
      lines: ['Sales'],
      short: ['Sales'],
      icon: 'ic-sales',
      color: '#8F6A22',
      folder: 'sales',
      tagline: 'Turn interest into a signed, deliverable commitment.',
      summary: 'Sales is where a stated need becomes a paid agreement. Good sales work is mostly qualification and honesty: finding out fast who is a fit, and being disciplined enough to walk away from the ones who are not.',
      questions: [
        'What has to be true for someone to be worth pursuing?',
        'Where in the pipeline do deals actually stall?',
        'What are the five objections we hear every week?',
        'What can we credibly forecast for next quarter?'
      ],
      resources: [
        { title: 'Pipeline Tracker', kind: 'Tracker', desc: 'Stage-by-stage view of every open deal and its next action.' },
        { title: 'Discovery Question Bank', kind: 'Guide', desc: 'Questions that surface budget, authority, need, and timing without an interrogation.' },
        { title: 'Objection Handling Playbook', kind: 'Playbook', desc: 'The common objections and a straight answer for each one.' },
        { title: 'Proposal & Quote Template', kind: 'Template', desc: 'A proposal structure that states scope, price, and terms plainly.' },
        { title: 'Qualification Scorecard', kind: 'Worksheet', desc: 'Score a lead before you spend three weeks on it.' },
        { title: 'Win/Loss Review Form', kind: 'Worksheet', desc: 'A short debrief after every closed deal, won or lost.' },
        { title: 'Quota & Forecast Model', kind: 'Calculator', desc: 'Work backwards from a revenue target to the activity it requires.' }
      ]
    },
    {
      id: 'operations',
      name: 'Operations',
      lines: ['Operations'],
      short: ['Ops'],
      icon: 'ic-operations',
      color: '#64713A',
      folder: 'operations',
      tagline: 'Keep the promise, at quality, at volume, on repeat.',
      summary: 'Operations is the part of the business the customer experiences as reality rather than message. It converts a sold promise into a delivered one, and it is where margin is quietly won or lost through capacity, process, and suppliers.',
      questions: [
        'What are the steps, who owns each one, and how long does it take?',
        'What breaks first when volume doubles?',
        'Which suppliers are we dependent on, and what if one fails?',
        'How do we know quality slipped before the customer tells us?'
      ],
      resources: [
        { title: 'Process Map & SOP Template', kind: 'Template', desc: 'Document a process well enough for a new hire to run it.' },
        { title: 'Capacity Planning Worksheet', kind: 'Worksheet', desc: 'Find the bottleneck before demand does.' },
        { title: 'Vendor Evaluation Scorecard', kind: 'Worksheet', desc: 'Compare suppliers on price, reliability, and risk in one table.' },
        { title: 'Reorder Point Calculator', kind: 'Calculator', desc: 'Work out when to reorder given lead time and demand variability.' },
        { title: 'Quality Checklist Builder', kind: 'Checklist', desc: 'Turn "do it properly" into steps someone can tick off.' },
        { title: 'Service Level Agreement', kind: 'Template', desc: 'Define what on-time and acceptable actually mean, in writing.' }
      ]
    },
    {
      id: 'finance',
      name: 'Finance',
      lines: ['Finance'],
      short: ['Finance'],
      icon: 'ic-finance',
      color: '#3A6B50',
      folder: 'finance',
      tagline: 'Make sure the business can pay for its own future.',
      summary: 'Finance is forward-looking: pricing, funding, cash runway, and whether the unit economics survive contact with growth. Profitable businesses still fail when they run out of cash, which is why this segment is about timing as much as totals.',
      questions: [
        'How many months of cash do we have at current burn?',
        'At what volume do we break even?',
        'Does each sale make money after the true cost of serving it?',
        'What is the cheapest capital available to us, and what does it cost in control?'
      ],
      resources: [
        { title: '12-Month Cash Flow Forecast', kind: 'Calculator', desc: 'Month-by-month cash in, cash out, and closing balance.' },
        { title: 'Break-Even Analysis', kind: 'Calculator', desc: 'Fixed costs, contribution margin, and the volume that clears them.' },
        { title: 'Pricing & Margin Model', kind: 'Calculator', desc: 'Test a price change against volume, margin, and profit.' },
        { title: 'Unit Economics Worksheet', kind: 'Worksheet', desc: 'Lifetime value against acquisition cost, honestly calculated.' },
        { title: 'Funding Options Comparison', kind: 'Worksheet', desc: 'Loan, investor, family, or revenue — side by side with real costs.' },
        { title: 'Capital Expenditure Request', kind: 'Template', desc: 'A one-page case for any purchase large enough to hurt.' }
      ]
    },
    {
      id: 'accounting',
      name: 'Accounting',
      lines: ['Accounting'],
      short: ['Accounts'],
      icon: 'ic-accounting',
      color: '#2C666E',
      folder: 'accounting',
      tagline: 'Record what happened, accurately and on time.',
      summary: 'Where finance looks forward, accounting looks back and keeps the record straight. Clean books are what make every other number in the business trustworthy — and they are what a lender, an investor, or a tax authority will actually read.',
      questions: [
        'Do we know what we earned and spent last month, to the dollar?',
        'Who owes us money, and how overdue are they?',
        'Are we set aside for the tax bill that is already coming?',
        'Could someone else close our books if they had to?'
      ],
      resources: [
        { title: 'Chart of Accounts Starter', kind: 'Template', desc: 'A sensible account structure for a small business, ready to import.' },
        { title: 'Monthly Close Checklist', kind: 'Checklist', desc: 'The steps that turn a messy month into a reconciled one.' },
        { title: 'AR Aging Tracker', kind: 'Tracker', desc: 'Who owes what, for how long, and when to chase.' },
        { title: 'Expense Policy', kind: 'Template', desc: 'What the business pays for, what it does not, and how to claim.' },
        { title: 'Bookkeeping Setup Guide', kind: 'Guide', desc: 'From receipts in a shoebox to a system that survives an audit.' },
        { title: 'Tax Calendar & Filing Tracker', kind: 'Tracker', desc: 'Every filing deadline in one place, with owners.' }
      ]
    },
    {
      id: 'human-resources',
      name: 'Human Resources',
      lines: ['Human', 'Resources'],
      short: ['People'],
      icon: 'ic-hr',
      color: '#38567F',
      folder: 'human-resources',
      tagline: 'Hire well, set expectations, and keep good people.',
      summary: 'People are the largest cost and the largest lever in most businesses. HR is the discipline of being deliberate about who joins, what good work looks like, how it is rewarded, and how disagreements get handled before they become expensive.',
      questions: [
        'What does this role actually need to be good at?',
        'How do we compare candidates without relying on gut feel?',
        'Does a new hire know what success looks like in week one?',
        'Are we paying fairly, and can we explain how we decided?'
      ],
      resources: [
        { title: 'Job Description Template', kind: 'Template', desc: 'Outcomes and competencies rather than a wishlist of years.' },
        { title: 'Structured Interview Scorecard', kind: 'Worksheet', desc: 'Same questions, same scale, comparable candidates.' },
        { title: 'Onboarding Checklist', kind: 'Checklist', desc: 'Everything a new hire needs across their first thirty days.' },
        { title: 'Performance Review Form', kind: 'Template', desc: 'A review structure that produces decisions, not adjectives.' },
        { title: 'Compensation Band Worksheet', kind: 'Worksheet', desc: 'Build defensible salary ranges for each role and level.' },
        { title: 'Employee Handbook Outline', kind: 'Guide', desc: 'The policies a small business genuinely needs, in order.' }
      ]
    },
    {
      id: 'information-technology',
      name: 'Information Technology',
      lines: ['Information', 'Technology'],
      short: ['IT'],
      icon: 'ic-it',
      color: '#524A83',
      folder: 'information-technology',
      tagline: 'Run the systems the business now depends on.',
      summary: 'IT stopped being a back office function the moment the business could not trade without its systems. This segment covers the tools you buy, the data you hold, who can reach it, and what happens on the day something is lost or breached.',
      questions: [
        'What software are we paying for, and who owns each account?',
        'If a laptop was stolen tonight, what would we lose?',
        'Who still has access who should not?',
        'When did we last test that the backup restores?'
      ],
      resources: [
        { title: 'Tech Stack Inventory', kind: 'Tracker', desc: 'Every system, its owner, its cost, and its renewal date.' },
        { title: 'Software Evaluation Matrix', kind: 'Worksheet', desc: 'Compare tools on requirements before the free trial ends.' },
        { title: 'Cybersecurity Baseline Checklist', kind: 'Checklist', desc: 'The controls a small business should have in place first.' },
        { title: 'Backup & Recovery Plan', kind: 'Template', desc: 'What is backed up, how often, and how it gets restored.' },
        { title: 'Access & Offboarding Checklist', kind: 'Checklist', desc: 'Close every account on the day someone leaves.' },
        { title: 'IT Budget Worksheet', kind: 'Calculator', desc: 'Licences, hardware, and services forecast for the year.' }
      ]
    },
    {
      id: 'rnd-innovation',
      name: 'R&D and Innovation',
      lines: ['R&D and', 'Innovation'],
      short: ['R&D'],
      icon: 'ic-rnd',
      color: '#77406F',
      folder: 'rnd-innovation',
      tagline: 'Find the next thing before the current one fades.',
      summary: 'R&D is the deliberate use of a small share of resources to test what might work next. Its output is not products but evidence — cheap experiments that either kill an idea early or earn it a larger investment.',
      questions: [
        'What are we assuming that we have never actually tested?',
        'What is the cheapest experiment that would change our mind?',
        'How do ideas get in, and who decides which ones proceed?',
        'Is our portfolio balanced between improving today and building tomorrow?'
      ],
      resources: [
        { title: 'Idea Intake & Scoring Sheet', kind: 'Worksheet', desc: 'A consistent way to compare ideas on impact, cost, and confidence.' },
        { title: 'Experiment Design Card', kind: 'Canvas', desc: 'State the hypothesis, the test, and the number that decides it.' },
        { title: 'Prototype Test Plan', kind: 'Template', desc: 'What you are testing, with whom, and what you will measure.' },
        { title: 'Product Roadmap', kind: 'Template', desc: 'Now, next, and later — with the reasoning kept attached.' },
        { title: 'Stage-Gate Review Checklist', kind: 'Checklist', desc: 'The evidence required before a project gets more money.' },
        { title: 'Innovation Portfolio Balance', kind: 'Worksheet', desc: 'Check how much you are investing in core, adjacent, and new.' }
      ]
    }
  ]
};
