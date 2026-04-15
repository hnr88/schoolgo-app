import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'SchoolGo Australia';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #fbf5f2 0%, #f0d9d1 100%)',
          color: '#3d1a14',
          fontFamily: 'sans-serif',
          padding: 80,
        }}
      >
        <div style={{ fontSize: 112, fontWeight: 900, letterSpacing: -2, display: 'flex' }}>
          School<span style={{ color: '#8b2a1f' }}>Go</span>
        </div>
        <div
          style={{
            fontSize: 28,
            marginTop: 24,
            textTransform: 'uppercase',
            letterSpacing: 8,
            opacity: 0.7,
          }}
        >
          Australia
        </div>
        <div
          style={{
            fontSize: 40,
            marginTop: 48,
            maxWidth: 900,
            textAlign: 'center',
            fontWeight: 600,
          }}
        >
          Find and compare the best schools across Australia.
        </div>
      </div>
    ),
    { ...size },
  );
}
