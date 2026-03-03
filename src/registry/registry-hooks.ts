import type { Registry } from './schema'

export const hooks: Registry = [
  {
    name: 'use-click-outside',
    type: 'registry:hook',
    files: [
      {
        path: 'hooks/use-click-outside.ts',
        type: 'registry:hook',
      },
    ],
  },
]
