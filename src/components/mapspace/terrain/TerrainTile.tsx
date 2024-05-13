'use client'

import { TileInteractivity } from '../../designer/mapspace/TileInteractivity'
import { useMapContext } from '../context/MapContext'
import { GridTileDefinition, XYLCoords } from '../types'
import { GridLines } from './GridLines'
import { TileDisplay } from './TileDisplay'

export const TerrainTile = ({
  tileDef,
  position,
}: {
  tileDef: GridTileDefinition
  position: XYLCoords
}) => {
  const { tileMode } = useMapContext()
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
