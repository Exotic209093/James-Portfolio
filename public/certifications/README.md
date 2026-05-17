# Certifications

Drop new certificate PDFs into this folder.

## How to add a new certificate

1. Save the PDF here using a slug-style filename: `<issuer>-<course-slug>.pdf`
   (e.g. `meta-version-control.pdf`, `google-ux-foundations.pdf`).
2. Add a matching entry to `lib/certifications.ts`:

   ```ts
   {
     id: 'meta-version-control',
     title: 'Version Control',
     issuer: 'Meta',
     platform: 'Coursera',
     issueDate: '2026-05-15',
     credentialId: 'XXXXXXXXXXXX',
     verifyUrl: 'https://coursera.org/verify/XXXXXXXXXXXX',
     pdf: '/certifications/meta-version-control.pdf',
     skills: ['Git', 'GitHub', 'Branching'],
     summary:
       'One-paragraph description of what the course covered. Shown at ' +
       'the top of the certification detail page.',
     topics: [
       'A specific thing the course taught',
       'Another topic covered',
     ],
   },
   ```

   `skills`, `summary`, and `topics` are optional but recommended. `summary`
   and `topics` populate the `/certifications/<id>` detail page — omitting
   them renders a thin page with only the PDF and verify link.
3. The `/certifications` page and the "Recent Certifications" preview on
   `/about` pick it up automatically. Entries are sorted newest-first by
   `issueDate`.
