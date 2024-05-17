'use client'

import { TerrainTile } from '@/components/mapspace/terrain/TerrainTile'
import { XYLCoords } from '@/components/mapspace/types'
import { useDesignerSelector } from '@/stores/designer/hooks'

export const DesignTerrainTile = ({ position }: { position: XYLCoords }) => {
  const tileDef = useDesignerSelector(
    state =>
      state.map.mapDefinition.layers.filter(l => l.gridId === position[2])[0]
        .grid[position[1]][position[0]],
    (a, b) => a.terrainType === b.terrainType,
  )
  return <TerrainTile tileDef={tileDef} position={position} />
}
