export default function RootNotFound() {
  return (
    <html lang='en'>
      <body>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            padding: '1.5rem',
            fontFamily: "'Google Sans', system-ui, sans-serif",
            background:
              'linear-gradient(135deg, oklch(0.97 0.01 220) 0%, white 50%, oklch(0.97 0.01 18) 100%)',
          }}
        >
          <p
            style={{
              fontSize: '8rem',
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: '-0.04em',
              color: 'oklch(0.75 0.1 220 / 0.2)',
              margin: 0,
            }}
          >
            404
          </p>
          <h1
            style={{
              fontSize: '1.875rem',
              fontWeight: 700,
              color: 'oklch(0.25 0.02 260)',
              margin: 0,
            }}
          >
            Page not found
          </h1>
          <p
            style={{
              fontSize: '1rem',
              color: 'oklch(0.55 0.01 260)',
              maxWidth: '28rem',
              textAlign: 'center',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <a
            href='/'
            style={{
              marginTop: '1rem',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.75rem 2rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'white',
              backgroundColor: 'oklch(0.685 0.188 18)',
              borderRadius: '0.75rem',
              textDecoration: 'none',
              boxShadow: '0 2px 8px oklch(0.685 0.188 18 / 0.3)',
            }}
          >
            Go home
          </a>
        </div>
      </body>
    </html>
  );
}
