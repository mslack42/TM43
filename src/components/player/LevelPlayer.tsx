'use client'
import { Fragment, useEffect } from 'react'
import { ObjectTile } from '../mapspace/objects/ObjectTile'
import { TerrainTile } from '../mapspace/terrain/TerrainTile'
import { MapDefinition } from '../mapspace/types'
import { useCamera } from './context/CameraContext'
import { useGameplayContext } from './context/GameplayContext'

type Props = {
  level: MapDefinition
}

export function LevelPlayer({ level }: Props) {
  const currFloorId = level.layers[0].gridId
  const { currentMapContext, currentRenderContext } = useGameplayContext()

  return (
    <div className='relative'>
      <div className='flex flex-col'>
        {currentMapContext.layers[0].grid.map((r, j) => (
          <div className='flex flex-row' key={j}>
            {r.map((c, k) => (
              <Fragment key={k}>
                <TerrainTile tileDef={c} position={[k, j, currFloorId]} />
              </Fragment>
            ))}
          </div>
        ))}
      </div>
      {currentRenderContext.objects
        .filter(obj => obj.floorId === currFloorId)
        .map(obj => (
          <GameObjectTile renderObjId={obj.id} key={obj.id} />
        ))}
    </div>
  )
}

const GameObjectTile = ({ renderObjId }: { renderObjId: number }) => {
  const {
    currentMapContext,
    currentRenderContext,
    setCurrentRenderContext,
    ticker,
  } = useGameplayContext()
  const { currentCameraFocusId, setCameraPosition } = useCamera()

  const renderObj = currentRenderContext.objects[renderObjId]
  const dataObj = currentMapContext.objects[renderObjId]

  useEffect(() => {
    const dataObjPos = dataObj.position.slice(0, 2) as [number, number]
    const targetCoords = dataObjPos.map(c => c * 32) as [number, number]

    if (
      targetCoords[0] !== renderObj.renderCoords[0] ||
      targetCoords[1] !== renderObj.renderCoords[1]
    ) {
      console.log('moving')
      const diff = [
        targetCoords[0] - renderObj.renderCoords[0],
        targetCoords[1] - renderObj.renderCoords[1],
      ]
      const newPos = [
        renderObj.renderCoords[0] + 16 * Math.sign(diff[0]),
        renderObj.renderCoords[1] + 16 * Math.sign(diff[1]),
      ] as [number, number]
      setCurrentRenderContext({
        ...currentRenderContext,
        objects: currentRenderContext.objects.map(robj => {
          if (renderObj.id !== robj.id) {
            return robj
          }
          return {
            ...robj,
            renderCoords: newPos,
          }
        }),
      })

      if (currentCameraFocusId === renderObj.id) {
        setCameraPosition([-newPos[0], -newPos[1]])
      }
    }
  }, [ticker])

  return (
    <div
      key={renderObjId}
      style={{
        position: 'absolute',
        left: renderObj.renderCoords[0],
        top: renderObj.renderCoords[1],
      }}
    >
      <ObjectTile object={currentMapContext.objects[renderObj.id]} />
    </div>
  )
}
