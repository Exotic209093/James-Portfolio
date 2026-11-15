import RenderHero from '@/components/home/RenderHero'
import Exhibition, { type ExhibitRoom } from '@/components/home/Exhibition'
import HistoryGraph, { type HistoryRow, type HistoryTrack } from '@/components/home/HistoryGraph'
import Merge from '@/components/home/Merge'
import PageTransition from '@/components/PageTransition'
import CompanyAndCommunity, { type ContributionSummary } from '@/components/sections/CompanyAndCommunity'
import { getContributionFeeds } from '@/lib/contribution-feed'
import { getLatestActivity } from '@/lib/activity-feed'
import { getProjectArt } from '@/lib/project-art'
import { projectEvidence } from '@/lib/project-evidence'
import { getProjectBySlug, projects, projectTracks, trackById } from '@/lib/projects'
import s from '@/components/home/Home.module.css'

// Refresh the upstream contribution count hourly; the page stays static between refreshes.
export const revalidate = 3600

// Four different kinds of work, chosen deliberately rather than by date.
// `evidenceLabel` names the real screenshot or output each room can switch to.
const exhibition: { id: string; proof: string; evidenceLabel?: string }[] = [
  { id: 'wave-link', proof: 'Published Chrome extension · Salesforce data workflows', evidenceLabel: 'Screenshot' },
  { id: 'docify', proof: 'Native Rust renderer · PDF, PNG and SVG output', evidenceLabel: 'Real output' },
  { id: 'flux-terminal', proof: 'Released desktop app · Electron and xterm.js' },
  { id: 'galacia', proof: 'Live product website · Independently built and deployed', evidenceLabel: 'Live site' },
]

const rooms: ExhibitRoom[] = exhibition.map(({ id, proof, evidenceLabel }) => {
  const evidence = projectEvidence[id]
  const project = getProjectBySlug(id)
  if (!project) throw new Error(`Missing exhibition project: ${id}`)
  const art = getProjectArt(id)
  return {
    id,
    title: project.title,
    description: project.description,
    accent: art.accent,
    label: art.label,
    trackLabel: trackById[project.track].label,
    tech: project.tech.slice(0, 3),
    proof,
    image: project.image,
    ...(evidence && evidenceLabel
      ? { evidence: { image: evidence.image, alt: evidence.alt, label: evidenceLabel } }
      : {}),
  }
})

const historyRows: HistoryRow[] = [...projects]
  .sort((a, b) => b.date.localeCompare(a.date) || Number(b.featured) - Number(a.featured) || a.title.localeCompare(b.title))
  .map((project) => ({
    id: project.id,
    title: project.title,
    label: getProjectArt(project.id).label,
    track: project.track,
    trackLabel: trackById[project.track].label,
    date: project.date,
    tech: project.tech,
    image: project.image,
  }))

const historyTracks: HistoryTrack[] = projectTracks.map((track) => ({ id: track.id, label: track.label }))

export default async function Home() {
  const [feeds, activity] = await Promise.all([getContributionFeeds(), getLatestActivity()])
  const items = feeds.flatMap((feed) => feed.items)
  const contributions: ContributionSummary = {
    merged: items.filter((item) => item.status === 'merged').length,
    open: items.filter((item) => item.status === 'open').length,
    live: feeds.every((feed) => feed.source === 'github'),
  }

  return (
    <PageTransition>
      <div className={s.branch} aria-hidden="true" />
      <RenderHero projectCount={projects.length} branchCount={projectTracks.length} activity={activity} />
      <Exhibition rooms={rooms} />
      <HistoryGraph rows={historyRows} tracks={historyTracks} />
      <CompanyAndCommunity contributions={contributions} />
      <Merge />
    </PageTransition>
  )
}
