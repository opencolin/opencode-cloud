import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'opencode.cloud',
      description: 'Host isolated AI coding environments in the cloud with branching and collaboration',
      logo: {
        light: './src/assets/logo-light.svg',
        dark: './src/assets/logo-dark.svg',
        alt: 'opencode.cloud'
      },
      social: {
        github: 'https://github.com/opencolin/opencode-cloud'
      },
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Introduction', slug: 'intro' },
            { label: 'Quickstart', slug: 'quickstart' },
            { label: 'Architecture', slug: 'architecture' }
          ]
        },
        {
          label: 'Concepts',
          items: [
            { label: 'Sessions', slug: 'concepts/sessions' },
            { label: 'Branching', slug: 'concepts/branching' },
            { label: 'Collaboration', slug: 'concepts/collaboration' }
          ]
        },
        {
          label: 'API Reference',
          items: [
            { label: 'Authentication', slug: 'api/auth' },
            { label: 'Sessions', slug: 'api/sessions' },
            { label: 'Branching', slug: 'api/branching' },
            { label: 'Proxy', slug: 'api/proxy' }
          ]
        },
        {
          label: 'Guides',
          items: [
            { label: 'Contree Setup', slug: 'guides/contree-setup' },
            { label: 'Deployment', slug: 'guides/deployment' }
          ]
        }
      ]
    })
  ]
});
