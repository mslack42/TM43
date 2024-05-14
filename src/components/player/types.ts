import {
  GridDefinition,
  MapDefinition,
  ObjectDefinition,
  ObjectType,
} from '../mapspace/types'

export type RenderMapDefinition = {
  objects: RenderObjectDefinition[]
}
export type RenderObjectDefinition = {
  id: number
  objectType: ObjectType
  renderCoords: [number, number]
  floorId: string
}

export type GameplayState = {
  terrainMaps: GridDefinition[]
  objects: GameplayObject[]
  camera: Camera
  activeObjectId: number
  actionObjectType: ObjectType
}

export type Camera = {
  floorId: string
  position: RenderCoords
}

type RenderX = number
type RenderY = number
export type RenderCoords = [RenderX, RenderY]

export type ObjectState = 'Stopped' | 'Walking' | 'Sliding'
export type ObjectOrientation = 'North' | 'South' | 'East' | 'West'

export type GameplayObject = {
  objectType: ObjectType
  position: RenderCoords
  objectState: ObjectState
  orientation: ObjectOrientation
  objectId: number
  floorId: string
}

export function gameStateFromDesign(def: MapDefinition): GameplayState {
  /// Default for now
  const initActive = def.objects
    .map((obj, id) => [obj, id] as [ObjectDefinition, number])
    .filter(obj => obj[0].objectType === 'Player')[0]
  const output: GameplayState = {
    terrainMaps: def.layers,
    objects: def.objects.map((obj, id) => {
      return {
        objectType: obj.objectType,
        objectId: id,
        /// Default this to Stopped for now
        objectState: 'Stopped',
        /// Default this to North for now
        orientation: 'North',
        position: [32 * obj.position[0], 32 * obj.position[1]],
        floorId: obj.position[2],
      }
    }),
    camera: {
      position: [
        32 * initActive[0].position[0],
        32 * initActive[0].position[1],
      ],
      floorId: initActive[0].position[2],
    },
    activeObjectId: initActive[1],
    actionObjectType: 'Player',
  }

  return output
}
