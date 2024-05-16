import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  MapDefinition,
  ObjectType,
  TerrainType,
} from '../../components/mapspace/types'
import { XYLCoords } from './../../components/mapspace/types'
import { defaultMapDefintion } from './defaultMapDefintion'

type MapState = {
  mapDefinition: MapDefinition
}
const initialState: MapState = {
  mapDefinition: defaultMapDefintion,
}

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    updateMap: (state, action: PayloadAction<MapDefinition>) => {
      state.mapDefinition = action.payload
    },
    renameLayer: (
      state,
      action: PayloadAction<{ oldName: string; newName: string }>,
    ) => {
      state.mapDefinition.layers.forEach(l => {
        if (l.gridId === action.payload.oldName) {
          l.gridId = action.payload.newName
        }
      })
      state.mapDefinition.objects.forEach(ob => {
        if (ob.position[2] === action.payload.oldName) {
          ob.position[2] = action.payload.newName
        }
      })
    },
    resizeLayer: (
      state,
      action: PayloadAction<{ gridId: string; newX: number; newY: number }>,
    ) => {
      const { gridId, newX, newY } = action.payload
      const oldGrid = state.mapDefinition.layers.filter(
        g => g.gridId === gridId,
      )[0]
      const oldX = oldGrid.grid[0].length
      const oldY = oldGrid.grid.length
      const newGrid = Array(newY)
        .fill(null)
        .map(r =>
          Array(newX)
            .fill(null)
            .map(c => c),
        )
      for (let j = 0; j < newY; j++) {
        for (let i = 0; i < newX; i++) {
          if (i < oldX && j < oldY) {
            newGrid[j][i] = oldGrid.grid[j][i]
          } else {
            newGrid[j][i] = oldGrid.grid[oldY - 1][oldX - 1]
          }
        }
      }

      oldGrid.grid = newGrid
    },
    placeObject: (
      state,
      action: PayloadAction<{ position: XYLCoords; objectType: ObjectType }>,
    ) => {
      state.mapDefinition.objects.push(action.payload)
    },
    placeTerrainTile: (
      state,
      action: PayloadAction<{ newTerrain: TerrainType; position: XYLCoords }>,
    ) => {
      const { newTerrain, position } = action.payload
      state.mapDefinition.layers.forEach(l => {
        if (l.gridId !== position[2]) {
          return
        }
        l.grid[position[1]][position[0]].terrainType = newTerrain
      })
    },
  },
})

export const {
  updateMap,
  renameLayer,
  resizeLayer,
  placeObject,
  placeTerrainTile,
} = mapSlice.actions

export default mapSlice.reducer
