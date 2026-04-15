---
paths:
  - "src/app/**/*.tsx"
  - "src/app/**/*.jsx"
---

Default to Server Components. Only add 'use client' when the component needs:
- useState, useEffect, useRef, or other React hooks
- Browser-only APIs (window, document, localStorage)
- Event handlers (onClick, onChange, onSubmit, etc.)
- Third-party client-only libraries

Never add 'use client' to page.tsx or layout.tsx unless absolutely necessary — extract the interactive part into a separate Client Component instead.
