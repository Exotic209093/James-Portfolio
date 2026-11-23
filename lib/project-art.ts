// Concept artwork, not product screenshots. Thrift Map's cover is composed from
// its real Google Play screenshots.
export const projectArt: Record<string, { accent: string; label: string }> = {
  docify: { accent: '#edb585', label: 'Native rendering' },
  'infinity-dox': { accent: '#8baaff', label: 'Documents at scale' },
  everfrost: { accent: '#a8dfeb', label: 'My own company' },
  'thrift-map': { accent: '#f2c14e', label: 'Second-hand, mapped' },
  'the-loft-zante': { accent: '#f1bc91', label: 'A Mediterranean evening' },
  'file-insights': { accent: '#c5b5f6', label: 'Look beneath the surface' },
  'infinite-idea': { accent: '#d3b9fb', label: 'Space for an idea' },
  'bloons-tower-defense': {
    accent: '#a8e6b0',
    label: 'Strategy in the browser',
  },
  'flux-terminal': { accent: '#b6e5a1', label: 'A timeline for your terminal' },
  vastify: { accent: '#f1b67b', label: 'Connected cloud storage' },
  'everfrost-vault': { accent: '#79ddcb', label: 'Files in a cloud you own' },
  'wave-link': { accent: '#85dce9', label: 'Data in motion' },
  'salesforce-spreadsheet-formatter': {
    accent: '#e9c189',
    label: 'From messy to ready',
  },
  'ai-email-triage-automation': {
    accent: '#a0c9e8',
    label: 'An inbox with direction',
  },
  exocraft: { accent: '#a4d99c', label: 'A world worth exploring' },
  'git-navigator': { accent: '#d1b6f4', label: 'Follow the branches' },
  'exoware-kernel-driver': {
    accent: '#eea39a',
    label: 'Beneath the abstraction',
  },
}
export function getProjectArt(id: string) {
  return projectArt[id] ?? { accent: '#c4b5fd', label: 'Selected work' }
}
