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
  },
]

export function getCertifications(): Certification[] {
  return [...certifications].sort((a, b) => (a.issueDate < b.issueDate ? 1 : -1))
}

export function getRecentCertifications(limit = 3): Certification[] {
  return getCertifications().slice(0, limit)
}
