'use client'
import { Fragment } from 'react'
import { ObjectTile } from '../mapspace/objects/ObjectTile'
import { TerrainTile } from '../mapspace/terrain/TerrainTile'

import { useGameplayContext } from './context/GameplayContext'

export function LevelPlayer() {
  const { gamestate } = useGameplayContext()
  const currFloorId = gamestate.camera.floorId

  return (
    <div className='relative'>
      <div className='flex flex-col'>
        {gamestate.terrainMaps
          .filter(m => m.gridId === gamestate.camera.floorId)[0]
          .grid.map((r, j) => (
            <div className='flex flex-row' key={j}>
              {r.map((c, k) => (
                <Fragment key={k}>
                  <TerrainTile tileDef={c} position={[k, j, currFloorId]} />
                </Fragment>
              ))}
            </div>
          ))}
      </div>
      {gamestate.objects
        .filter(obj => obj.floorId === currFloorId)
        .map(obj => (
          <GameObjectTile renderObjId={obj.objectId} key={obj.objectId} />
        ))}
    </div>
  )
}

const GameObjectTile = ({ renderObjId }: { renderObjId: number }) => {
  const { gamestate } = useGameplayContext()

  const obj = gamestate.objects.filter(ob => ob.objectId === renderObjId)[0]

  return (
    <div
      key={renderObjId}
      style={{
        position: 'absolute',
        left: obj.position[0],
        top: obj.position[1],
      }}
    >
      <ObjectTile objectType={obj.objectType} />
    </div>
  )
}
