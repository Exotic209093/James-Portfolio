import JobsDashboard from '@/components/jobs/JobsDashboard'
import { getApplications, getLatestRun, getJobStats, getApplicantProfile } from '@/lib/jobs'

// Data is read only on the server, behind the /jobs authentication proxy.
// The client receives the fields displayed by this page for this request.
export default function JobsPage() {
  const latestRun = getLatestRun()
  const stats = getJobStats()

  return (
    <JobsDashboard
      applications={getApplications().map((application) => ({
        id: application.id,
        title: application.title,
        company: application.company,
        location: application.location,
        salary: application.salary,
        status: application.status,
        stretch: application.stretch,
        appliedDate: application.appliedDate,
        match: { strongFor: application.match.strongFor },
      }))}
      latestRun={latestRun && {
        date: latestRun.date,
        searches: latestRun.searches,
        screenedOut: latestRun.screenedOut,
        notes: latestRun.notes,
      }}
      stats={{
        applications: stats.applications,
        candidatesSeen: stats.candidatesSeen,
        screenedOut: stats.screenedOut,
        stretchApplications: stats.stretchApplications,
      }}
      profile={getApplicantProfile()}
    />
  )
}
