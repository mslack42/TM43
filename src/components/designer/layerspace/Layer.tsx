'use client'

import { updateCursorTile } from '@/stores/designer/designerCursorSlice'
import {
  useDesignerDispatch,
  useDesignerSelector,
} from '@/stores/designer/hooks'
import { Fragment, memo, useMemo } from 'react'
import { ObjectTile } from '../../mapspace/objects/ObjectTile'
import { TerrainTile } from '../../mapspace/terrain/TerrainTile'
import { ObjectDefinition } from '../../mapspace/types'
import { EditDropdown } from './EditDropdown'
import { ObjectCursorWrapper } from './ObjectCursorWrapper'
import { TerrainCursorWrapper } from './TerrainCursorWrapper'

export const Layer = ({ layerIndex }: { layerIndex: number }) => {
  const layerHeight = useDesignerSelector(
    state => state.map.mapDefinition.layers[layerIndex].grid.length,
  )
  const layerWidth = useDesignerSelector(
    state => state.map.mapDefinition.layers[layerIndex].grid[0].length,
  )
  const layerMapId = useDesignerSelector(
    state => state.map.mapDefinition.layers[layerIndex].gridId,
  )
  const layerObjects = useDesignerSelector(
    state =>
      state.map.mapDefinition.objects.filter(
        obj => obj.position[2] === layerMapId,
      ),
    (a, b) => a.length === b.length && a.every((v, i) => v === b[i]),
  )
  const dispatch = useDesignerDispatch()

  const objects = useMemo(() => {
    const objects: (ObjectDefinition | null)[][] = Array(layerHeight)
      .fill(null)
      .map(r => Array(layerWidth).fill(null))
    layerObjects
      .filter(ob => ob.position[2] === layerMapId)
      .forEach(ob => {
        objects[ob.position[1]][ob.position[0]] = ob
      })
    return objects
  }, [layerHeight, layerMapId, layerObjects, layerWidth])

  return (
    <div className='bg-white'>
      <div className='flex w-full flex-row  justify-between space-x-2'>
        <div className='text-nowrap'>{layerMapId}</div>
        <EditDropdown layerId={layerMapId} />
      </div>
      <div
        className='relative'
        onPointerLeave={() => dispatch(updateCursorTile(null))}
      >
        <TerrainCursorWrapper>
          <MTerrainGrid
            width={layerWidth}
            height={layerHeight}
            layerId={layerMapId}
          />
        </TerrainCursorWrapper>
        <ObjectCursorWrapper>
          {objects.map((r, j) => (
            <div key={j} className='flex flex-row'>
              {r.map((c, k) => (
                <Fragment key={`${k}-${j}`}>
                  <ObjectTile
                    objectType={c?.objectType ?? undefined}
                    position={[k, j, layerMapId]}
                  />
                </Fragment>
              ))}
            </div>
          ))}
        </ObjectCursorWrapper>
      </div>
    </div>
  )
}

const TerrainGrid = ({
  width,
  height,
  layerId,
}: {
  width: number
  height: number
  layerId: string
}) => {
  const terrainGrid = useMemo(() => {
    return Array(height)
      .fill(null)
      .map(_ => Array(width).fill(null))
  }, [height, width])
  return (
    <>
      {terrainGrid.map((r, j) => (
        <div key={j} className='flex flex-row'>
          {r.map((c, k) => (
            <Fragment key={`${k}-${j}`}>
              <MTerrainTile position={[k, j, layerId]} />
            </Fragment>
          ))}
        </div>
      ))}
    </>
  )
}
const MTerrainTile = memo(TerrainTile)
const MTerrainGrid = memo(TerrainGrid)
