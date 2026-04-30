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
