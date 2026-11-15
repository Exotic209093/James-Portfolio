/** Technology filters shared by the homepage history and the project index. */
export const TECH_FILTERS: { name: string; test: (tech: string[]) => boolean }[] = [
  { name: 'TypeScript', test: (tech) => tech.includes('TypeScript') },
  { name: 'Apex', test: (tech) => tech.some((item) => item.startsWith('Apex')) },
  { name: 'React', test: (tech) => tech.includes('React') },
  { name: 'Python', test: (tech) => tech.includes('Python') },
  { name: 'Node.js', test: (tech) => tech.includes('Node.js') },
  { name: 'Lightning Web Components', test: (tech) => tech.some((item) => item === 'LWC' || item.startsWith('Lightning Web Components')) },
  { name: 'Claude and LLMs', test: (tech) => tech.some((item) => /^(Anthropic|Claude|LLM)/.test(item)) },
  { name: 'Rust', test: (tech) => tech.includes('Rust') },
  { name: 'Electron', test: (tech) => tech.includes('Electron') },
  { name: 'Three.js', test: (tech) => tech.includes('Three.js') },
  { name: 'AWS', test: (tech) => tech.some((item) => item.startsWith('AWS')) },
  { name: 'C++', test: (tech) => tech.includes('C++') },
]
