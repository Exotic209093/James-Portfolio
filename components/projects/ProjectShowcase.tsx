'use client'

import { useState, type ReactNode, type CSSProperties } from 'react'
import { getProjectArt } from '@/lib/project-art'
import {
  ArrowRight,
  Check,
  FileText,
  Folder,
  GitBranch,
  Play,
  Plus,
  RotateCcw,
  Terminal,
} from 'lucide-react'
import styles from './ProjectShowcase.module.css'

function Choices({
  options,
  value,
  onChange,
}: {
  options: string[]
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className={styles.choices}>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={value === option}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

function Panel({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={styles.panel}>
      <p className={styles.label}>{label}</p>
      {children}
    </div>
  )
}

function DocumentDemo({ merge = false }: { merge?: boolean }) {
  const [format, setFormat] = useState('PDF')
  const [customer, setCustomer] = useState('Alex Morgan')
  const [title, setTitle] = useState('A small idea.')
  return (
    <>
      <Choices
        options={
          merge ? ['Alex Morgan', 'Sam Rivera'] : ['PDF', 'PNG', 'SVG', 'DOCX']
        }
        value={merge ? customer : format}
        onChange={merge ? setCustomer : setFormat}
      />
      <div className={styles.split}>
        <Panel label={merge ? '01 / Salesforce record' : '01 / Source'}>
          {!merge && (
            <label className={styles.field}>
              Document heading
              <input
                value={title}
                maxLength={60}
                onChange={(event) => setTitle(event.target.value)}
              />
            </label>
          )}
          <pre>
            {merge
              ? `Contact.Name: ${customer}\nAccount: ${customer === 'Alex Morgan' ? 'North Studio' : 'Harbour Works'}\nDocument: Welcome letter`
              : `<article>\n  <h1>${title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</h1>\n  <p>Many possibilities.</p>\n</article>\n\nh1 { color: #0f766e; }`}
          </pre>
          <span className={styles.tag}>
            {merge ? 'Merge fields' : 'HTML + CSS'}
          </span>
        </Panel>
        <div className={styles.paper}>
          <span className={styles.label}>
            {merge ? '02 / Personalised document' : `02 / ${format} preview`}
          </span>
          <FileText size={30} />
          <h3>
            {merge
              ? `Hello, ${customer.split(' ')[0]}.`
              : title || 'Your heading'}
          </h3>
          <p>
            {merge
              ? `Welcome to ${customer === 'Alex Morgan' ? 'North Studio' : 'Harbour Works'}. Your information, in the right document.`
              : 'Many possibilities.'}
          </p>
          <div className={styles.paperLines} />
          <span className={styles.paperNote}>
            {merge
              ? 'Record + template = document'
              : {
                  PDF: 'Paginated document',
                  PNG: 'Raster image output',
                  SVG: 'Vector page output',
                  DOCX: 'Editable Word output / pre-production',
                }[format]}
          </span>
        </div>
      </div>
      <p className={styles.caption}>
        {merge
          ? 'Change the sample record to see the merge concept.'
          : 'One source, several output formats. This is a visual explanation, not the Rust engine running in your browser.'}
      </p>
    </>
  )
}

const products = {
  Vault: [
    'Files, closer to the work.',
    'In development',
    'Connect Salesforce records to customer-owned storage.',
  ],
  Docs: [
    'From information to document.',
    'Planned concept',
    'Reusable templates and a guided document workflow.',
  ],
  Track: [
    'Know what happens next.',
    'Planned concept',
    'Delivery progress, ownership, and next actions.',
  ],
  Connect: [
    'Keep the context together.',
    'Planned concept',
    'Team conversations alongside the work.',
  ],
}
function GalaciaDemo() {
  const [product, setProduct] = useState('Vault')
  const item = products[product as keyof typeof products]
  return (
    <>
      <Choices
        options={Object.keys(products)}
        value={product}
        onChange={setProduct}
      />
      <div className={styles.brandScene}>
        <div className={styles.glacier} aria-hidden="true" />
        <div>
          <span className={styles.tag}>{item[1]}</span>
          <p className={styles.brandName}>Galacia {product}.</p>
          <h3>{item[0]}</h3>
          <p>{item[2]}</p>
        </div>
      </div>
    </>
  )
}

const menu = {
  Refreshing: [
    ['Citrus Spritz', 'Orange / soda / ice'],
    ['Garden Cooler', 'Cucumber / mint / lime'],
  ],
  Classics: [
    ['Old Fashioned', 'Whiskey / bitters / orange'],
    ['Margarita', 'Tequila / lime / salt'],
  ],
  'Alcohol-free': [
    ['Sunset Soda', 'Grapefruit / rosemary'],
    ['Lemon & Mint', 'Fresh lemon / mint / soda'],
  ],
}
function MenuDemo() {
  const [category, setCategory] = useState('Refreshing')
  return (
    <>
      <Choices
        options={Object.keys(menu)}
        value={category}
        onChange={setCategory}
      />
      <div className={styles.menu}>
        <span className={styles.label}>
          A taste of the evening / sample menu
        </span>
        <h3>The Loft.</h3>
        {menu[category as keyof typeof menu].map(([name, ingredients]) => (
          <div className={styles.menuItem} key={name}>
            <span>
              {name}
              <small>{ingredients}</small>
            </span>
            <span aria-hidden="true">↗</span>
          </div>
        ))}
      </div>
      <p className={styles.caption}>
        An example of the category browsing experience. These are illustrative
        items, not the venue’s current menu.
      </p>
    </>
  )
}

function MetadataDemo() {
  const [file, setFile] = useState('Photo')
  const [clean, setClean] = useState(false)
  return (
    <>
      <Choices
        options={['Photo', 'Audio', 'Document']}
        value={file}
        onChange={(value) => {
          setFile(value)
          setClean(false)
        }}
      />
      <div className={styles.split}>
        <div className={styles.fileIcon}>
          <FileText size={64} strokeWidth={1} />
          <h3>
            {
              {
                Photo: 'landscape.jpg',
                Audio: 'evening.flac',
                Document: 'proposal.pdf',
              }[file]
            }
          </h3>
          <span className={styles.tag}>Sample file / nothing uploaded</span>
        </div>
        <Panel label="Metadata inspector">
          <dl className={styles.facts}>
            <dt>Format</dt>
            <dd>
              {file === 'Photo' ? 'JPEG' : file === 'Audio' ? 'FLAC' : 'PDF'}
            </dd>
            <dt>
              {file === 'Photo'
                ? 'Dimensions'
                : file === 'Audio'
                  ? 'Artist'
                  : 'Title'}
            </dt>
            <dd>
              {file === 'Photo'
                ? '4032 × 3024'
                : file === 'Audio'
                  ? 'Sample artist'
                  : 'Project proposal'}
            </dd>
            <dt>Personal metadata</dt>
            <dd>{clean ? 'Removed from example' : 'Present in example'}</dd>
          </dl>
          <button
            type="button"
            className={styles.action}
            onClick={() => setClean(!clean)}
          >
            {clean ? 'Restore example' : 'Strip sample metadata'}{' '}
            <Check size={16} />
          </button>
        </Panel>
      </div>
    </>
  )
}

function CanvasDemo() {
  const [nodes, setNodes] = useState(['Brief', 'Build', 'Review'])
  return (
    <>
      <div className={styles.toolbar}>
        <button
          className={styles.action}
          type="button"
          disabled={nodes.length >= 6}
          onClick={() => setNodes([...nodes, `Step ${nodes.length + 1}`])}
        >
          <Plus size={16} /> Add a step
        </button>
        <button
          className={styles.action}
          type="button"
          onClick={() => setNodes(['Brief', 'Build', 'Review'])}
        >
          <RotateCcw size={16} /> Reset
        </button>
      </div>
      <div className={styles.canvas}>
        {nodes.map((node, index) => (
          <div className={styles.canvasNode} key={index}>
            <span className={styles.label}>
              {String(index + 1).padStart(2, '0')}
            </span>
            <strong>{node}</strong>
            {index < nodes.length - 1 && (
              <ArrowRight size={18} aria-hidden="true" />
            )}
          </div>
        ))}
      </div>
      <p className={styles.caption}>
        Build a tiny process map. The full application adds freeform editing,
        Salesforce blocks, and exports.
      </p>
    </>
  )
}

function TowerDemo() {
  const [tower, setTower] = useState('Dart')
  const [step, setStep] = useState(0)
  const range = tower === 'Dart' ? 25 : tower === 'Sniper' ? 70 : 40
  const hit = Math.abs(step * 10 - 50) <= range
  return (
    <>
      <Choices
        options={['Dart', 'Sniper', 'Ice']}
        value={tower}
        onChange={setTower}
      />
      <div className={styles.towerScene}>
        <svg
          viewBox="0 0 600 220"
          role="img"
          aria-label={`${tower} tower. Target ${hit ? 'in' : 'out of'} illustrative range.`}
        >
          <path
            d="M30 160H570"
            stroke="#334155"
            strokeWidth="32"
            strokeLinecap="round"
          />
          <ellipse
            cx="300"
            cy="100"
            rx={range * 5}
            ry="92"
            fill="#2dd4bf"
            fillOpacity=".08"
            stroke="#2dd4bf"
            strokeDasharray="5 8"
          />
          <rect x="279" y="79" width="42" height="42" rx="8" fill="#2dd4bf" />
          <circle
            cx={50 + step * 50}
            cy="160"
            r="14"
            fill={hit ? '#fbbf24' : '#fb7185'}
          />
          {hit && (
            <path
              d={`M300 110L${50 + step * 50} 160`}
              stroke="#fbbf24"
              strokeWidth="2"
            />
          )}
        </svg>
      </div>
      <div className={styles.toolbar}>
        <button
          className={styles.action}
          type="button"
          onClick={() => setStep((step + 1) % 11)}
        >
          <Play size={16} /> Move target
        </button>
        <span>{hit ? 'Target acquired' : 'Outside range'}</span>
      </div>
      <p className={styles.caption}>
        A simplified range illustration, not a simulation of the game’s balance
        or combat rules.
      </p>
    </>
  )
}

const session = [
  'Read the brief',
  'Inspect source files',
  'Implement the change',
  'Run focused checks',
  'Review the result',
]
function TerminalDemo() {
  const [step, setStep] = useState(2)
  return (
    <>
      <div className={styles.terminal}>
        <div className={styles.terminalBar}>
          <Terminal size={16} /> sample-session <span>REPLAY</span>
        </div>
        {session.map((line, index) => (
          <p key={line} className={index > step ? styles.future : undefined}>
            <span>{String(index + 1).padStart(2, '0')}:</span> {line}{' '}
            {index <= step && <Check size={14} />}
          </p>
        ))}
      </div>
      <label className={styles.slider}>
        Scrub the session{' '}
        <input
          type="range"
          min="0"
          max="4"
          value={step}
          onChange={(event) => setStep(Number(event.target.value))}
        />
        <span>
          {step + 1} / {session.length} · {session[step]}
        </span>
      </label>
    </>
  )
}

function StorageDemo({ vault = false }: { vault?: boolean }) {
  const [selected, setSelected] = useState('Account')
  const [stored, setStored] = useState(false)
  return (
    <>
      {vault && (
        <Choices
          options={['Account', 'Opportunity', 'Case']}
          value={selected}
          onChange={setSelected}
        />
      )}
      <div className={styles.storage}>
        <Panel label={vault ? `Salesforce / ${selected}` : 'Salesforce'}>
          <Folder size={38} />
          <h3>{vault ? `${selected} files` : 'Source record'}</h3>
          <p>
            {vault
              ? 'proposal.pdf'
              : stored
                ? 'Reference retained'
                : 'report.pdf'}
          </p>
        </Panel>
        <div className={styles.connection}>
          <ArrowRight size={24} />
          <span>{vault ? 'Connected' : stored ? 'Offloaded' : 'Ready'}</span>
        </div>
        <Panel label="Customer-owned cloud">
          <Folder size={38} />
          <h3>Your storage</h3>
          <p>
            {vault || stored
              ? 'File available in context'
              : 'Waiting for sample file'}
          </p>
        </Panel>
      </div>
      {!vault && (
        <button
          className={styles.action}
          type="button"
          onClick={() => setStored(!stored)}
        >
          {stored ? 'Reset workflow' : 'Offload sample file'}{' '}
          <ArrowRight size={16} />
        </button>
      )}
      <p className={styles.caption}>
        {vault
          ? 'A concept preview of record-linked cloud files. Vault is in development; no live Salesforce connection is made.'
          : 'Explore the storage-offloading concept with an illustrative file. No customer data or cost estimates.'}
      </p>
    </>
  )
}

function DataDemo({ formatter = false }: { formatter?: boolean }) {
  const [result, setResult] = useState(false)
  const [object, setObject] = useState('Contacts')
  return (
    <>
      {!formatter && (
        <Choices
          options={['Contacts', 'Accounts']}
          value={object}
          onChange={(value) => {
            setObject(value)
            setResult(false)
          }}
        />
      )}
      <Panel
        label={formatter ? 'Import preparation' : 'Sample Salesforce export'}
      >
        <pre>
          {formatter
            ? result
              ? 'Id,Active,Date\n001000000000001AAA,true,2026-09-16\n001000000000002AAA,false,2026-09-17'
              : 'Id,Active,Date\n001000000000001AAA,Yes,16/09/2026\n001000000000002AAA,No,17/09/2026'
            : result
              ? object === 'Contacts'
                ? 'Name,Email\nAlex Morgan,alex@example.com\nSam Rivera,sam@example.com'
                : 'Name,Industry\nNorth Studio,Design\nHarbour Works,Engineering'
              : `SELECT ${object === 'Contacts' ? 'Name, Email FROM Contact' : 'Name, Industry FROM Account'}\nLIMIT 2`}
        </pre>
      </Panel>
      <button
        className={styles.action}
        type="button"
        onClick={() => setResult(!result)}
      >
        {result
          ? 'Back to input'
          : formatter
            ? 'Normalise sample'
            : 'Preview CSV'}{' '}
        <ArrowRight size={16} />
      </button>
      <p className={styles.caption}>
        {formatter
          ? 'Example conversion using day/month/year dates. IDs stay as text; booleans and dates become consistent.'
          : 'A small example of query-to-export. No Salesforce account or live query is involved.'}
      </p>
    </>
  )
}

const emails = [
  {
    subject: 'Please review the proposal by Friday',
    body: 'Could you review the attached proposal and send your comments before Friday?',
    priority: 'Action requested',
    next: 'Review the proposal',
    deadline: 'Friday (as written)',
  },
  {
    subject: 'Your weekly product digest',
    body: 'Here are this week’s updates and recently published articles.',
    priority: 'Informational',
    next: 'Read when convenient',
    deadline: 'None mentioned',
  },
  {
    subject: 'Meeting moved to 14:00',
    body: 'Tomorrow’s project catch-up will start at 14:00 instead of 13:00.',
    priority: 'Schedule update',
    next: 'Check the calendar',
    deadline: 'Tomorrow at 14:00 (as written)',
  },
]
function EmailDemo() {
  const [index, setIndex] = useState(0)
  const email = emails[index]
  return (
    <>
      <Choices
        options={['Request', 'Newsletter', 'Schedule']}
        value={['Request', 'Newsletter', 'Schedule'][index]}
        onChange={(value) =>
          setIndex(['Request', 'Newsletter', 'Schedule'].indexOf(value))
        }
      />
      <div className={styles.split}>
        <Panel label="Incoming sample">
          <h3>{email.subject}</h3>
          <p>{email.body}</p>
        </Panel>
        <Panel label="Structured recommendation">
          <span className={styles.tag}>{email.priority}</span>
          <h3>{email.next}</h3>
          <p>{email.deadline}</p>
        </Panel>
      </div>
      <p className={styles.caption}>
        Prewritten examples of structured triage output, not live AI
        classification.
      </p>
    </>
  )
}

function VoxelDemo() {
  const [biome, setBiome] = useState('Meadow')
  const [night, setNight] = useState(false)
  const colour =
    biome === 'Meadow' ? '#4ade80' : biome === 'Desert' ? '#fbbf24' : '#c4e8ff'
  return (
    <>
      <Choices
        options={['Meadow', 'Desert', 'Snow']}
        value={biome}
        onChange={setBiome}
      />
      <div
        className={styles.voxelScene}
        style={{ background: night ? '#080e28' : '#153b54' }}
      >
        <svg
          viewBox="0 0 600 260"
          role="img"
          aria-label={`${biome} voxel illustration at ${night ? 'night' : 'day'}`}
        >
          <circle
            cx="480"
            cy="45"
            r="20"
            fill={night ? '#dbeafe' : '#fde68a'}
          />
          {Array.from({ length: 28 }, (_, i) => {
            const x = 80 + (i % 7) * 58 + Math.floor(i / 7) * 18
            const y = 75 + Math.floor(i / 7) * 32 + ((i % 7) % 3) * 8
            return (
              <g key={i}>
                <path d={`M${x} ${y}l28 -14 28 14 -28 14Z`} fill={colour} />
                <path
                  d={`M${x} ${y}v35l28 14V${y + 14}Z`}
                  fill={colour}
                  opacity=".45"
                />
                <path
                  d={`M${x + 28} ${y + 14}l28 -14v35l-28 14Z`}
                  fill={colour}
                  opacity=".7"
                />
              </g>
            )
          })}
        </svg>
      </div>
      <button
        className={styles.action}
        type="button"
        aria-pressed={night}
        onClick={() => setNight(!night)}
      >
        {night ? 'Bring back daylight' : 'Switch to night'}
      </button>
      <p className={styles.caption}>
        A stylised biome illustration. Open the live game for the actual world,
        PBR materials, and gameplay.
      </p>
    </>
  )
}

function GitDemo() {
  const [branch, setBranch] = useState('main')
  return (
    <>
      <Choices
        options={['main', 'feature/menu', 'fix/layout']}
        value={branch}
        onChange={setBranch}
      />
      <div className={styles.gitScene}>
        <svg
          viewBox="0 0 180 220"
          role="img"
          aria-label={`${branch} selected in an illustrative commit graph`}
        >
          <path
            d="M45 20V200M45 55C45 80 110 60 110 100V130C110 165 45 145 45 180M45 90C45 120 155 100 155 155"
            fill="none"
            stroke="#475569"
            strokeWidth="3"
          />
          {[25, 60, 100, 145, 190].map((y) => (
            <circle
              key={y}
              cx="45"
              cy={y}
              r="7"
              fill={branch === 'main' ? '#2dd4bf' : '#64748b'}
            />
          ))}
          <circle
            cx="110"
            cy="118"
            r="9"
            fill={branch === 'feature/menu' ? '#c4b5fd' : '#64748b'}
          />
          <circle
            cx="155"
            cy="155"
            r="9"
            fill={branch === 'fix/layout' ? '#fbbf24' : '#64748b'}
          />
        </svg>
        <div>
          <span className={styles.tag}>
            <GitBranch size={14} /> {branch}
          </span>
          <h3>
            {branch === 'main'
              ? 'The shared history.'
              : branch === 'feature/menu'
                ? 'Room for the next idea.'
                : 'A focused improvement.'}
          </h3>
          <p>
            {branch === 'main'
              ? 'Browse commits and see where work comes together.'
              : branch === 'feature/menu'
                ? 'Follow a feature without losing sight of the main branch.'
                : 'Keep a small fix easy to inspect and review.'}
          </p>
          <span className={styles.label}>
            Illustrative history / no repository modified
          </span>
        </div>
      </div>
    </>
  )
}

function DriverDemo() {
  const [step, setStep] = useState('Request')
  return (
    <>
      <Choices
        options={['Request', 'Validate', 'Respond']}
        value={step}
        onChange={setStep}
      />
      <div className={styles.driver}>
        <Panel label="User space">
          <Terminal size={32} />
          <h3>Caller</h3>
          <p>A bounded example request</p>
        </Panel>
        <div className={styles.boundary}>
          <span>Trust boundary</span>
          <ArrowRight size={22} />
        </div>
        <Panel label="Kernel space">
          <div className={styles.memory}>
            {Array.from({ length: 24 }, (_, i) => (
              <span
                key={i}
                className={
                  step === 'Respond' && i >= 8 && i < 12
                    ? styles.activeCell
                    : ''
                }
              />
            ))}
          </div>
          <h3>
            {step === 'Request'
              ? 'Receive request'
              : step === 'Validate'
                ? 'Check the contract'
                : 'Return a bounded result'}
          </h3>
        </Panel>
      </div>
      <p className={styles.caption}>
        A conceptual driver request lifecycle. No native code runs and no device
        memory is accessed.
      </p>
    </>
  )
}

const showcases: Record<
  string,
  { title: string; prompt: string; demo: ReactNode }
> = {
  docify: {
    title: 'One source. Different possibilities.',
    prompt: 'Choose an output format.',
    demo: <DocumentDemo />,
  },
  'infinity-docs': {
    title: 'The right words. The right record.',
    prompt: 'Try a different sample contact.',
    demo: <DocumentDemo merge />,
  },
  galacia: {
    title: 'Explore what is taking shape.',
    prompt: 'Pick a product direction.',
    demo: <GalaciaDemo />,
  },
  'the-loft-zante': {
    title: 'Find your evening.',
    prompt: 'Browse a sample drinks menu.',
    demo: <MenuDemo />,
  },
  'file-insights': {
    title: 'There is more inside a file.',
    prompt: 'Inspect a sample and remove its metadata.',
    demo: <MetadataDemo />,
  },
  'infinite-idea': {
    title: 'Give an idea some space.',
    prompt: 'Build a small process map.',
    demo: <CanvasDemo />,
  },
  'bloons-tower-defense': {
    title: 'Position. Range. Timing.',
    prompt: 'Choose a tower and move the target.',
    demo: <TowerDemo />,
  },
  'flux-terminal': {
    title: 'A session you can rewind.',
    prompt: 'Drag the timeline to explore the replay concept.',
    demo: <TerminalDemo />,
  },
  vastify: {
    title: 'Move the file. Keep the connection.',
    prompt: 'Step through an example offload.',
    demo: <StorageDemo />,
  },
  'galacia-vault': {
    title: 'Your files, in context.',
    prompt: 'Explore the record-linked storage concept.',
    demo: <StorageDemo vault />,
  },
  'wave-link': {
    title: 'From a query to something useful.',
    prompt: 'Choose sample data and preview an export.',
    demo: <DataDemo />,
  },
  'salesforce-spreadsheet-formatter': {
    title: 'Make the next import easier.',
    prompt: 'Compare messy input with consistent output.',
    demo: <DataDemo formatter />,
  },
  'ai-email-triage-automation': {
    title: 'Turn an inbox into next steps.',
    prompt: 'Explore three example recommendations.',
    demo: <EmailDemo />,
  },
  exocraft: {
    title: 'A world with a different mood.',
    prompt: 'Change the biome and the time of day.',
    demo: <VoxelDemo />,
  },
  'git-navigator': {
    title: 'See where the work branches.',
    prompt: 'Select a branch in the example history.',
    demo: <GitDemo />,
  },
  'exoware-kernel-driver': {
    title: 'Across the system boundary.',
    prompt: 'Follow a conceptual request lifecycle.',
    demo: <DriverDemo />,
  },
}

export default function ProjectShowcase({ projectId }: { projectId: string }) {
  const showcase = showcases[projectId]
  if (!showcase) return null
  return (
    <section
      className={styles.showcase}
      style={
        { '--studio-accent': getProjectArt(projectId).accent } as CSSProperties
      }
      aria-labelledby="showcase-title"
    >
      <div className={styles.heading}>
        <span className={styles.eyebrow}>
          02 / Interactive studio <span>/ Illustrative demo</span>
        </span>
        <h2 id="showcase-title">{showcase.title}</h2>
        <p>{showcase.prompt}</p>
      </div>
      <div className={styles.stage}>{showcase.demo}</div>
    </section>
  )
}
