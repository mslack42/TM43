export type RenderMapDefinition = {
  objects: RenderObjectDefinition[]
}
export type RenderObjectDefinition = {
  id: number
  objectType: ObjectType
  renderCoords: [number, number]
  floorId: string
}
