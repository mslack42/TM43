import {
  GridDefinition,
  TerrainType,
  XYCoords,
} from '@/components/mapspace/types'
import { GameplayObject, GameplayState } from '../types'

export type GameplayStateAction = TickAction | PlayerMoveAction
type TickAction = {
  action: 'tick'
}
type PlayerMoveAction = {
  action: 'playermove'
  direction: Direction
}
type Direction = 'North' | 'South' | 'East' | 'West'

const directionMap = {
  North: [0, -1],
  South: [0, 1],
  East: [1, 0],
  West: [-1, 0],
}

export const GameplayStateReducer = (
  state: GameplayState,
  action: GameplayStateAction,
): GameplayState => {
  let newState: GameplayState
  switch (action.action) {
    case 'tick': {
      newState = tick(state)
      break
    }
    case 'playermove': {
      newState = playermove(state, action.direction)
      break
    }
    default: {
      newState = state
    }
  }
  return newState
}

function getTerrainAt(
  coords: XYCoords,
  map: GridDefinition,
): TerrainType | null {
  const [x, y] = coords
  if (x < 0 || y < 0 || map.grid.length <= y || map.grid[0].length <= x) {
    return null
  }

  return map.grid[y][x].terrainType
}

function tick(state: GameplayState): GameplayState {
  let newState: GameplayState = {
    ...state,
    objects: state.objects.map(obj => {
      if (obj.objectState === 'Stopped') {
        return obj
      }
      const vector: [number, number] = directionMap[obj.orientation] as [
        number,
        number,
      ]
      const nextPosIfMoving = [
        obj.position[0] + vector[0] * 8,
        obj.position[1] + vector[1] * 8,
      ]
      const isBetweenTiles = !(
        obj.position[0] % 32 === 0 && obj.position[1] % 32 === 0
      )
      if (isBetweenTiles) {
        // continue
        return {
          ...obj,
          position: nextPosIfMoving,
        }
      }
      // Finished step
      const [x, y, floor] = [
        obj.position[0] / 32,
        obj.position[1] / 32,
        obj.floorId,
      ]
      const currMap = state.terrainMaps.filter(m => m.gridId === floor)[0]
      const terrainType = getTerrainAt([x, y], currMap)
      const nextTerrainType = getTerrainAt(
        [x + vector[0], y + vector[1]],
        currMap,
      )
      const nextObjectsIfAny = state.objects
        .filter(oth => oth.objectId !== obj.objectId)
        .filter(oth => oth.floorId === obj.floorId)
        .filter(
          oth =>
            Math.abs(oth.position[0] - nextPosIfMoving[0]) < 32 &&
            Math.abs(oth.position[1] - nextPosIfMoving[1]) < 32,
        )

      if (obj.objectState === 'Walking') {
        if (
          terrainType === 'Ground' ||
          (nextObjectsIfAny.length > 0 &&
            nextObjectsIfAny.some(oth => oth.objectType === 'Player'))
        ) {
          // Stop movement
          return {
            ...obj,
            objectState: 'Stopped',
          }
        }
        if (terrainType === 'Ice') {
          // Initiate slide
          return {
            ...obj,
            objectState: 'Sliding',
            position: nextPosIfMoving,
          }
        }
      }
      if (obj.objectState === 'Sliding') {
        if (
          nextTerrainType === 'Rock' ||
          nextTerrainType === null ||
          (nextObjectsIfAny.length > 0 &&
            nextObjectsIfAny.some(oth => oth.objectType === 'Player'))
        ) {
          return {
            ...obj,
            objectState: 'Stopped',
          }
        }
        if (terrainType !== 'Ice') {
          return {
            ...obj,
            objectState: 'Stopped',
          }
        }
        return {
          ...obj,
          position: nextPosIfMoving,
        }
      }

      return obj
    }) as GameplayObject[],
  }
  newState.camera.position = newState.objects[
    newState.activeObjectId
  ].position.map(v => -v) as [number, number]

  return newState
}
function playermove(state: GameplayState, direction: Direction): GameplayState {
  if (state.objects.some(x => x.objectState !== 'Stopped')) {
    return state
  }
  let newState: GameplayState = {
    ...state,
    objects: state.objects.map(obj => {
      if (obj.objectType !== state.actionObjectType) {
        return obj
      }
      if (obj.objectState !== 'Stopped') {
        return obj
      }

      const [x, y, floor] = [
        obj.position[0] / 32,
        obj.position[1] / 32,
        obj.floorId,
      ]
      const currMap = state.terrainMaps.filter(m => m.gridId === floor)[0]
      const vector: [number, number] = directionMap[direction] as [
        number,
        number,
      ]
      const nextPosIfMoving = [
        obj.position[0] + vector[0] * 8,
        obj.position[1] + vector[1] * 8,
      ]
      const terrainType = getTerrainAt([x, y], currMap)
      const nextTerrainType = getTerrainAt(
        [x + vector[0], y + vector[1]],
        currMap,
      )
      const nextObjectsIfAny = state.objects
        .filter(oth => oth.objectId !== obj.objectId)
        .filter(oth => oth.floorId === obj.floorId)
        .filter(
          oth =>
            Math.abs(oth.position[0] - nextPosIfMoving[0]) < 32 &&
            Math.abs(oth.position[1] - nextPosIfMoving[1]) < 32,
        )

      if (
        nextTerrainType === 'Rock' ||
        nextTerrainType === null ||
        (nextObjectsIfAny.length > 0 &&
          nextObjectsIfAny.some(oth => oth.objectType === 'Player'))
      ) {
        return { ...obj, orientation: direction }
      }
      if (terrainType === 'Ice') {
        return {
          ...obj,
          objectState: 'Sliding',
          position: nextPosIfMoving,
          orientation: direction,
        }
      }
      if (terrainType === 'Ground') {
        return {
          ...obj,
          objectState: 'Walking',
          position: nextPosIfMoving,
          orientation: direction,
        }
      }

      return obj
    }) as GameplayObject[],
  }
  newState.camera.position = newState.objects[
    newState.activeObjectId
  ].position.map(v => -v) as [number, number]

  return newState
}
