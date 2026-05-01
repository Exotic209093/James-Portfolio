export interface Certification {
  id: string
  title: string
  issuer: string
  platform: string
  issueDate: string
  credentialId: string
  verifyUrl: string
  pdf: string
  skills?: string[]
  summary?: string
  topics?: string[]
}

export const certifications: Certification[] = [
  {
    id: 'meta-intro-databases-back-end-development',
    title: 'Introduction to Databases for Back-End Development',
    issuer: 'Meta',
    platform: 'Coursera',
    issueDate: '2026-05-01',
    credentialId: 'W88B0IRCW8WZ',
    verifyUrl: 'https://coursera.org/verify/W88B0IRCW8WZ',
    pdf: '/certifications/meta-intro-databases-back-end-development.pdf',
    skills: ['SQL', 'Relational databases', 'Data modelling', 'Database design'],
    summary:
      'Meta’s introduction to the data layer that sits behind every back-end. Worked through relational database fundamentals — tables, schemas, keys, and relationships — and SQL for querying and modifying data, plus how a back-end actually talks to the database it depends on.',
    topics: [
      'Why back-end systems need databases',
      'Relational vs non-relational data models',
      'Tables, columns, rows, and schemas',
      'Primary keys, foreign keys, and relationships',
      'SQL fundamentals: SELECT, INSERT, UPDATE, DELETE',
      'Filtering, sorting, and grouping query results',
      'Joining data across multiple tables',
      'Database design and normalisation basics',
    ],
  },
  {
    id: 'meta-version-control',
    title: 'Version Control',
    issuer: 'Meta',
    platform: 'Coursera',
    issueDate: '2026-05-01',
    credentialId: 'IKI0O5RMNTSR',
    verifyUrl: 'https://coursera.org/verify/IKI0O5RMNTSR',
    pdf: '/certifications/meta-version-control.pdf',
    skills: ['Git', 'GitHub', 'Branching', 'Code review'],
    summary:
      'Meta’s end-to-end course on Git and collaborative version control. Covered the full Git mental model — repos, commits, branches, merges, conflicts — and the GitHub side of the workflow: forks, pull requests, and code review. The same workflow underpins every project in this portfolio.',
    topics: [
      'Git fundamentals: working tree, staging area, and commits',
      'Creating and switching branches; fast-forward vs three-way merges',
      'Resolving merge conflicts safely',
      'Reading history with log, diff, and blame',
      'Remotes, fetching, pulling, and pushing',
      'Collaborating on GitHub: forks, pull requests, and code review',
      '.gitignore and managing untracked files',
      'Tagging releases and reverting unwanted changes',
    ],
  },
  {
    id: 'meta-intro-back-end-development',
    title: 'Introduction to Back-End Development',
    issuer: 'Meta',
    platform: 'Coursera',
    issueDate: '2026-04-30',
    credentialId: '2EEHSP7IQGKJ',
    verifyUrl: 'https://coursera.org/verify/2EEHSP7IQGKJ',
    pdf: '/certifications/meta-intro-back-end-development.pdf',
    skills: ['HTTP', 'REST APIs', 'Web servers', 'Back-end fundamentals'],
    summary:
      'Meta’s entry course into back-end engineering. Covered how the web actually works under the hood — request/response cycles, the role of servers, and where back-end code sits in a modern stack — plus a tour of the technologies and roles involved in shipping production software.',
    topics: [
      'How the internet works: clients, servers, IPs, and DNS',
      'HTTP fundamentals and the request/response cycle',
      'Front-end vs back-end vs full-stack roles',
      'Web servers and where back-end code runs',
      'Cloud hosting basics and deployment models',
      'Working with APIs at a conceptual level',
      'Version control with Git and collaborative workflows',
      'Career paths and day-to-day life of a back-end engineer',
    ],
  },
  {
    id: 'meta-programming-in-python',
    title: 'Programming in Python',
    issuer: 'Meta',
    platform: 'Coursera',
    issueDate: '2026-04-30',
    credentialId: 'M9H29EYRUWME',
    verifyUrl: 'https://coursera.org/verify/M9H29EYRUWME',
    pdf: '/certifications/meta-programming-in-python.pdf',
    skills: ['Python', 'OOP', 'Data structures', 'Algorithms'],
    summary:
      'Meta’s Python fundamentals course. Worked through Python syntax, control flow, and data structures, then up into object-oriented programming, modules, error handling, and writing testable code — the foundations a back-end engineer relies on day-to-day.',
    topics: [
      'Python syntax, variables, and core data types',
      'Control flow: conditionals, loops, and comprehensions',
      'Functions, scope, and reusable code',
      'Built-in data structures: lists, tuples, sets, dicts',
      'Object-oriented programming: classes, inheritance, encapsulation',
      'Modules, packages, and the standard library',
      'File I/O and exception handling',
      'Algorithmic thinking and basic problem-solving patterns',
    ],
  },
]

export function getCertifications(): Certification[] {
  return [...certifications].sort((a, b) => (a.issueDate < b.issueDate ? 1 : -1))
}

export function getRecentCertifications(limit = 3): Certification[] {
  return getCertifications().slice(0, limit)
}

export function getCertificationById(id: string): Certification | undefined {
  return certifications.find((certification) => certification.id === id)
}
