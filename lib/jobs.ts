// Reusable data layer for the job-search dashboard.
//
// Each job-routine run produces a `JobRun`: the searches that were run, how many
// candidates were seen, and the tailored applications that were queued. The
// hand-written first run lives in `jobRuns` below; every later run is imported
// from the Claude-Skills application packages via scripts/import-job-runs.mjs,
// which regenerates lib/job-run-data.ts. The dashboard and all getters derive
// everything (stats, listings, detail pages) from the combined set.

// The type-only cycle with ./job-run-data (it imports `JobRun` from here) is
// erased at compile time.
import { importedJobRuns } from './job-run-data'

export type ApplicationStatus =
  | 'queued'
  | 'needs_input'
  | 'applied'
  | 'interviewing'
  | 'offer'
  | 'rejected'
  | 'screened_out'
  | 'closed'

export interface JobMatch {
  /** Areas where the profile is a strong fit for the role. */
  strongFor: string[]
  /** Honest gaps between the profile and the role's requirements. */
  gaps: string[]
}

export interface JobApplication {
  /** URL-safe slug, unique across all runs. */
  id: string
  title: string
  company: string
  location: string
  salary: string
  jobType: string
  /** Where the listing came from (e.g. "indeed"). */
  source: string
  /** Apply link for the listing. */
  applyUrl: string
  status: ApplicationStatus
  /**
   * A "stretch" application: queued under an apply-broadly policy with material
   * gaps disclosed up front rather than hidden.
   */
  stretch?: boolean
  /** One-paragraph summary of the role. */
  summary: string
  match: JobMatch
  /** Outstanding questions the application still needs answers for. */
  needsInput: string[]
  /** ISO date the application was prepared. */
  appliedDate: string
}

export interface ScreenedOutGroup {
  reason: string
  count: number
}

export interface JobRun {
  /** Run identifier, also used as the date label (e.g. "2026-06-09"). */
  id: string
  date: string
  /** Searches executed during the run. */
  searches: string[]
  /** Unique candidates seen after de-duplication. */
  candidatesSeen: number
  /** Applications that were tailored and queued. */
  applications: JobApplication[]
  /** Aggregated reasons candidates were screened out. */
  screenedOut: ScreenedOutGroup[]
  /** Tuning notes / observations from the run. */
  notes?: string[]
}

export interface ApplicantProfile {
  linkedin: string
  portfolio: string
  relocation: string
  workStyle: string
  drivingLicence: string
}

// Canonical applicant details, mirrored from the job-search profile
// (Claude-Skills `jobs/profile/profile-context.md`). Anything answered here is
// removed from an application's outstanding `needsInput` automatically.
export const applicantProfile: ApplicantProfile = {
  linkedin: 'https://www.linkedin.com/in/james-collard-6b925a313/',
  portfolio: 'https://james-c.app',
  relocation: 'Open to relocating for the right role (negotiable)',
  workStyle: 'No strong preference — remote, hybrid, or on-site',
  drivingLicence: 'Full UK driving licence',
}

// needsInput keys that the profile above now answers, so they no longer count
// as outstanding on any application (current or future).
const profileAnsweredKeys = new Set([
  'linkedin',
  'portfolio',
  'relocation',
  'remote_preference',
  'driving_licence',
])

const jobRuns: JobRun[] = [
  {
    id: '2026-06-09',
    date: '2026-06-09',
    candidatesSeen: 26,
    searches: [
      'Salesforce Developer (remote)',
      'Salesforce Developer (London)',
      'Back-End Developer (remote)',
      'Software Engineer (Kent)',
      'Software Developer (remote)',
    ],
    screenedOut: [
      { reason: 'Security clearance required', count: 3 },
      { reason: 'Below minimum salary', count: 4 },
      { reason: 'On-site, outside allowed locations', count: 9 },
      { reason: 'Title mismatch', count: 3 },
      { reason: 'Other (aggregator / wrong domain)', count: 1 },
    ],
    notes: [
      'Several screened-out on-site roles are in commutable Kent / East Sussex towns (Tonbridge, Paddock Wood, Sittingbourne, Ashford) — dropped only because the town names are not in the location allow-list.',
      'Salary did the heavy lifting: only 4 remote candidates listed pay, all below the £30k minimum; salary-less listings were included by policy.',
    ],
    applications: [
      {
        id: 'global-4-communications-full-stack-developer',
        title: 'Full Stack Developer',
        company: 'Global 4 Communications',
        location: 'Remote (occasional travel to Horsham, West Sussex)',
        salary: 'Circa £40,000 per year',
        jobType: 'Permanent',
        source: 'indeed',
        applyUrl: 'https://to.indeed.com/aasv72gfj68g',
        status: 'queued',
        summary:
          'Family-run UK telecoms firm re-architecting its systems on a modern cloud stack. Core stack React, Node.js and TypeScript with AWS/Azure serverless, Docker and Git — building CRM interfaces, REST & SOAP APIs, improving CI/CD, architecting greenfield cloud products, and mentoring juniors.',
        match: {
          strongFor: [
            'React.js',
            'Node.js',
            'TypeScript',
            'AWS / serverless (Lambda)',
            'Docker',
            'Git',
            'REST APIs',
            'CI/CD pipelines (GitHub Actions)',
            'Building CRM interfaces (Salesforce)',
            'Architecting greenfield cloud products',
            'AI experience (Anthropic API automation)',
            'Mentoring juniors / code reviews',
          ],
          gaps: [
            'SOAP APIs — no direct experience (REST only)',
            'Refine framework — not used',
            'GraphQL — not used',
            'PHP — not used (JD wants some, to sunset legacy)',
            '~2 years experience overall',
          ],
        },
        needsInput: ['linkedin', 'portfolio', 'relocation', 'remote_preference', 'driving_licence'],
        appliedDate: '2026-06-09',
      },
      {
        id: 'ramark-systems-web-developer',
        title: 'Web Developer',
        company: 'Ramark systems Ltd',
        location: 'Remote',
        salary: '£34,000–£45,000 per year',
        jobType: 'Full-time',
        source: 'indeed',
        applyUrl: 'https://to.indeed.com/aan6bgy6z4xc',
        status: 'queued',
        summary:
          'Remote full-stack web developer building responsive web apps. Front-end HTML/CSS/JS/TypeScript with React or Angular; back-end Node.js/Django/.NET/Rails; SQL/NoSQL databases; Git; CI/CD; REST/SOAP/GraphQL; AWS/Azure desirable; Agile.',
        match: {
          strongFor: [
            'React 18',
            'TypeScript / JavaScript',
            'Node.js (Express/Hono)',
            'PostgreSQL',
            'Git',
            'CI/CD (GitHub Actions)',
            'REST APIs',
            'AWS',
            'Agile delivery',
            'Automated testing (Vitest/Playwright)',
          ],
          gaps: [
            'Angular — uses React instead',
            'SOAP & GraphQL — REST only',
            'Jenkins — uses GitHub Actions',
            'SEO — limited',
            '~2 years experience overall',
          ],
        },
        needsInput: ['linkedin', 'portfolio', 'relocation', 'remote_preference', 'driving_licence'],
        appliedDate: '2026-06-09',
      },
      {
        id: 'value-tech-labs-web-developer',
        title: 'Web Developer',
        company: 'Value Tech Labs Limited',
        location: 'Remote',
        salary: '£30,000–£45,000 per year',
        jobType: 'Full-time',
        source: 'indeed',
        applyUrl: 'https://to.indeed.com/aadjb629gkbn',
        status: 'queued',
        summary:
          'Remote full-stack web developer. Front-end HTML/CSS/JS/TypeScript with React (React Native/Redux); back-end Node.js/Django/.NET/Rails/PHP; SQL/NoSQL; Docker; AWS/Azure; REST/SOAP; responsive design + SEO; Git; unit testing; SDLC/DevOps.',
        match: {
          strongFor: [
            'React 18 & React Native',
            'TypeScript / JavaScript',
            'Node.js (Express/Hono)',
            'Docker',
            'AWS',
            'PostgreSQL / Redis',
            'REST APIs',
            'Git',
            'Unit & E2E testing (Vitest/Playwright)',
            'Agile / SDLC',
          ],
          gaps: [
            'PHP, .NET, Rails — back end is Node',
            'Angular — uses React',
            'SOAP — REST only',
            'SEO — limited',
            'Tomcat/IIS — not used',
            '~2 years experience overall',
          ],
        },
        needsInput: ['linkedin', 'portfolio', 'relocation', 'remote_preference', 'driving_licence'],
        appliedDate: '2026-06-09',
      },
      {
        id: 'trimble-software-engineer',
        title: 'Software Engineer',
        company: 'Trimble (Transportation Enterprise division)',
        location: 'Remote',
        salary: 'Not stated',
        jobType: 'Full-time',
        source: 'indeed',
        applyUrl: 'https://to.indeed.com/aaq48pqzl2l2',
        status: 'queued',
        stretch: true,
        summary:
          'Software engineer for an enterprise transport/logistics platform and integration microservices. C#/.NET, SQL Server, Kafka, microservices, REST, Docker/Kubernetes, GitHub Actions CI/CD, and a public cloud (Azure preferred). Explicitly an AI-forward team using AI dev tools day to day.',
        match: {
          strongFor: [
            '2 years professional software engineering experience',
            'Microservices and REST APIs',
            'Async / event-driven design',
            'Docker',
            'GitHub Actions CI/CD',
            'Git / GitHub',
            'SQL (PostgreSQL)',
            'Public cloud (AWS)',
            'Strong written/verbal communication',
            'Day-to-day fluency with AI developer tools and the Anthropic API',
          ],
          gaps: [
            'C# and .NET — none; primary stack is TypeScript/Node',
            'SQL Server / T-SQL — none; SQL experience is PostgreSQL',
            'Kafka or other message broker — none; has used AWS SQS but not Kafka',
            'Azure — none; cloud experience is AWS (Azure preferred)',
            'Kubernetes — Docker yes, but no stated Kubernetes exposure',
            'Transport / logistics domain — none',
          ],
        },
        needsInput: ['linkedin', 'portfolio', 'relocation', 'driving_licence', 'kafka_experience'],
        appliedDate: '2026-06-09',
      },
      {
        id: 'purplebricks-lead-backend-fullstack-engineer',
        title: 'Lead Backend/FullStack Engineer',
        company: 'Purplebricks UK',
        location: 'Remote',
        salary: 'Not stated',
        jobType: 'Permanent',
        source: 'indeed',
        applyUrl: 'https://to.indeed.com/aa9xxwvhc4xx',
        status: 'queued',
        stretch: true,
        summary:
          'Lead engineering role building C#/.NET Core microservices and Web APIs on Azure with message-based architectures, SQL/NoSQL, and integrated AI/LLM (OpenAI/Azure OpenAI) capabilities. Involves coaching backend engineers, steering architecture, and Agile delivery, with React/React Native familiarity and agentic AI exposure desired.',
        match: {
          strongFor: [
            'Integrating AI/LLM into back-end services (Anthropic API classifier/executor)',
            'Agentic AI patterns: tool use, orchestration, MCP-style tooling',
            'REST API design',
            'Message-based / queue-driven architectures (SQS)',
            'SQL & NoSQL (PostgreSQL, Redis)',
            'React / React Native / npm',
            'CI/CD (GitHub Actions)',
            'Agile (Scrum/Kanban)',
            'Unit/automated testing (Vitest, CodeQL, Snyk)',
          ],
          gaps: [
            'Seniority: this is a LEAD role; ~2 years experience and no team lead / line-management',
            'C#/.NET Core + .NET Web API — backend stack is Node/Bun/Express, not .NET',
            'Azure — cloud experience is AWS, not Azure',
          ],
        },
        needsInput: ['linkedin', 'portfolio', 'relocation', 'driving_licence'],
        appliedDate: '2026-06-09',
      },
      {
        id: 'ramark-systems-software-test-engineer',
        title: 'Software Test Engineer',
        company: 'Ramark systems Ltd',
        location: 'Remote',
        salary: '£30,000–£45,000 per year',
        jobType: 'Full-time',
        source: 'indeed',
        applyUrl: 'https://to.indeed.com/aalf89t8bpkw',
        status: 'queued',
        stretch: true,
        summary:
          'Remote QA/test engineer. Test automation (Selenium, TestNG, Cucumber); manual + automated testing across web/mobile/desktop; functional/integration/UAT/performance/load/security testing; CI/CD (Jenkins/GitLab/Azure DevOps); REST/SOAP APIs; SQL; LoadRunner/JMeter; Java/C#/Python/C++; Git.',
        match: {
          strongFor: [
            'Test automation (Playwright, Vitest)',
            'Testing in CI/CD (GitHub Actions)',
            'Security scanning (CodeQL, Snyk)',
            'REST API testing',
            'SQL / data validation',
            'Python & Bash scripting',
            'Git',
            'AWS',
            'Understands systems under test (builds them)',
          ],
          gaps: [
            'Dedicated QA role — background is development',
            'Selenium / TestNG / Cucumber — uses Playwright instead',
            'LoadRunner / JMeter — no hands-on performance testing',
            'SOAP — REST only',
            '~2 years experience overall',
          ],
        },
        needsInput: ['linkedin', 'portfolio', 'relocation', 'remote_preference', 'driving_licence'],
        appliedDate: '2026-06-09',
      },
    ],
  },
]

/** All runs (hand-written + imported), newest first. */
export function getJobRuns(): JobRun[] {
  return [...jobRuns, ...importedJobRuns].sort((a, b) => (a.date < b.date ? 1 : -1))
}

/** The most recent run, or undefined if there are none. */
export function getLatestRun(): JobRun | undefined {
  return getJobRuns()[0]
}

/** Every application across every run, newest first. */
export function getApplications(): JobApplication[] {
  return getJobRuns()
    .flatMap((run) => run.applications)
    .sort((a, b) => (a.appliedDate < b.appliedDate ? 1 : -1))
}

export function getApplicationById(id: string): JobApplication | undefined {
  return getApplications().find((application) => application.id === id)
}

export function getApplicantProfile(): ApplicantProfile {
  return applicantProfile
}

// An application's outstanding inputs, minus anything the profile now answers.
export function getOutstandingInputs(application: JobApplication): string[] {
  return application.needsInput.filter((key) => !profileAnsweredKeys.has(key))
}

export interface JobStats {
  runs: number
  applications: number
  stretchApplications: number
  candidatesSeen: number
  screenedOut: number
  byStatus: Record<string, number>
}

/** Aggregate stats across all runs, for the dashboard summary tiles. */
export function getJobStats(): JobStats {
  const runs = getJobRuns()
  const applications = getApplications()

  const byStatus = applications.reduce<Record<string, number>>((acc, application) => {
    acc[application.status] = (acc[application.status] ?? 0) + 1
    return acc
  }, {})

  return {
    runs: runs.length,
    applications: applications.length,
    stretchApplications: applications.filter((application) => application.stretch).length,
    candidatesSeen: runs.reduce((sum, run) => sum + run.candidatesSeen, 0),
    screenedOut: runs.reduce(
      (sum, run) => sum + run.screenedOut.reduce((s, group) => s + group.count, 0),
      0
    ),
    byStatus,
  }
}

export { jobRuns }
