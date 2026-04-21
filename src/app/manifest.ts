import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SchoolGo Australia',
    short_name: 'SchoolGo',
    description: 'Find and compare the best schools across Australia.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fbf5f2',
    theme_color: '#8b2a1f',
    icons: [
      {
        src: '/logos/fav-icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  };
}
