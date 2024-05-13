'use client'

import { TerrainType } from '../types'

export const TileDisplay = ({ terrain }: { terrain: TerrainType }) => {
  const getStyle = (terrain: TerrainType) => {
    switch (terrain) {
      case 'Ground': {
        return 'bg-slate-200 '
      }
      case 'Ice': {
        return 'bg-blue-200 '
      }
      case 'Rock': {
        return 'bg-stone-700 '
      }
      default: {
        return 'bg-white'
      }
    }
  }

  return <div className={getStyle(terrain) + ' h-full w-full'}></div>
}
