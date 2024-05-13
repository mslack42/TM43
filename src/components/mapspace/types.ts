type XCoord = number
type YCoord = number
export type XYCoords = [XCoord, YCoord]
type LayerId = string
export type XYLCoords = [XCoord, YCoord, LayerId]

export const TerrainTypes = ['Ground', 'Ice', 'Rock'] as const
export type TerrainType = (typeof TerrainTypes)[number]
export const ObjectTypes = ['Player', 'Goal'] as const
export type ObjectType = (typeof ObjectTypes)[number]

export type MapDefinition = {
  name: string
  objects: ObjectDefinition[]
  layers: GridDefinition[]
}
export type GridDefinition = {
  grid: GridTileDefinition[][]
  gridId: string
}

export type GridTileDefinition = {
  terrainType: TerrainType
}

export type ObjectDefinition = {
  objectType: ObjectType
  position: XYLCoords
}

export type TileMode = 'Designer' | 'Gameplay'
