'use client'

import { MapDefinition } from '@/components/mapspace/types'

export const defaultMapDefintion: MapDefinition = {
  objects: [
    {
      objectType: 'Player',
      position: [1, 1, 'ground'],
    },
    {
      objectType: 'Goal',
      position: [3, 3, 'basement'],
    },
  ],
  layers: [
    {
      gridId: 'ground',
      grid: [
        [
          { terrainType: 'Ground' },
          { terrainType: 'Ground' },
          { terrainType: 'Ground' },
          { terrainType: 'Ground' },
          { terrainType: 'Ground' },
        ],
        [
          { terrainType: 'Ground' },
          { terrainType: 'Ground' },
          { terrainType: 'Ice' },
          { terrainType: 'Ground' },
          { terrainType: 'Rock' },
        ],
        [
          { terrainType: 'Ground' },
          { terrainType: 'Ice' },
          { terrainType: 'Ice' },
          { terrainType: 'Ground' },
          { terrainType: 'Rock' },
        ],
        [
          { terrainType: 'Ground' },
          { terrainType: 'Ground' },
          { terrainType: 'Ice' },
          { terrainType: 'Ground' },
          { terrainType: 'Rock' },
        ],
        [
          { terrainType: 'Rock' },
          { terrainType: 'Rock' },
          { terrainType: 'Ground' },
          { terrainType: 'Ground' },
          { terrainType: 'Ground' },
        ],
      ],
    },
    {
      gridId: 'basement',
      grid: [
        [
          { terrainType: 'Ground' },
          { terrainType: 'Ground' },
          { terrainType: 'Ground' },
          { terrainType: 'Ground' },
          { terrainType: 'Ground' },
        ],
        [
          { terrainType: 'Ground' },
          { terrainType: 'Ground' },
          { terrainType: 'Ice' },
          { terrainType: 'Ground' },
          { terrainType: 'Rock' },
        ],
        [
          { terrainType: 'Ground' },
          { terrainType: 'Ice' },
          { terrainType: 'Ice' },
          { terrainType: 'Ground' },
          { terrainType: 'Rock' },
        ],
        [
          { terrainType: 'Ground' },
          { terrainType: 'Ground' },
          { terrainType: 'Ice' },
          { terrainType: 'Ground' },
          { terrainType: 'Rock' },
        ],
        [
          { terrainType: 'Rock' },
          { terrainType: 'Rock' },
          { terrainType: 'Ground' },
          { terrainType: 'Ground' },
          { terrainType: 'Ground' },
        ],
      ],
    },
  ],
  name: 'testmap',
}
