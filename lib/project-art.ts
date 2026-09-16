// Concept artwork, not product screenshots.
export const projectArt: Record<string, { accent: string; label: string }> = {
  docify: { accent: '#edb585', label: 'Native rendering' },
  'infinity-docs': { accent: '#8baaff', label: 'Document workflows' },
  galacia: { accent: '#79e5d2', label: 'Independent software' },
  'the-loft-zante': { accent: '#f1bc91', label: 'A Mediterranean evening' },
  'file-insights': { accent: '#c5b5f6', label: 'Look beneath the surface' },
  'infinite-idea': { accent: '#d3b9fb', label: 'Space for an idea' },
  'bloons-tower-defense': {
    accent: '#a8e6b0',
    label: 'Strategy in the browser',
  },
  'flux-terminal': { accent: '#b6e5a1', label: 'A timeline for your terminal' },
  vastify: { accent: '#f1b67b', label: 'Connected cloud storage' },
  'galacia-vault': { accent: '#79ddcb', label: 'Files in context' },
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
