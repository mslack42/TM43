'use client'

import { useDesignerSelector } from '@/stores/designer/hooks'
import { TileInteractivity } from '../../designer/mapspace/TileInteractivity'
import { useMapContext } from '../context/MapContext'
import { XYLCoords } from '../types'
import { GridLines } from './GridLines'
import { TileDisplay } from './TileDisplay'

export const TerrainTile = ({ position }: { position: XYLCoords }) => {
  const { tileMode } = useMapContext()
  const tileDef = useDesignerSelector(
    state =>
      state.map.mapDefinition.layers.filter(l => l.gridId === position[2])[0]
        .grid[position[1]][position[0]],
    (a, b) => a.terrainType === b.terrainType,
  )
  return (
    <div className='relative'>
      <div style={{ height: 32, width: 32 }}>
        <TileDisplay terrain={tileDef.terrainType} />
      </div>
      {tileMode === 'Designer' && (
        <>
          <GridLines />
          <div className='absolute bottom-0 left-0 right-0 top-0'>
            <TileInteractivity position={position} />
          </div>
        </>
      )}
    </div>
  )
}
