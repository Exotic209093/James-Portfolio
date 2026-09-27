import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'

export default defineConfig([
  ...nextVitals,
  {
    files: ['components/ModeProvider.tsx', 'components/lab/HtmlCanvas.tsx', 'components/lab/ThreeHologram.tsx'],
    // These existing effects initialise browser-only preferences/renderers after
    // hydration. Keep their new migration diagnostics visible without changing
    // the established animation behavior during the framework upgrade.
    rules: { 'react-hooks/set-state-in-effect': 'warn' },
  },
  {
    files: ['components/lab/HtmlCanvas.tsx'],
    // Particle velocity lives in an imperative canvas ref, outside React state.
    rules: { 'react-hooks/immutability': 'warn' },
  },
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
])
