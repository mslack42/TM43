import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TerrainType } from './../../components/mapspace/types'
import { placeTerrainTile } from './mapSlice'
import { DesignerThunk } from './store'

type PaintModeState = {
  isBrushDown: boolean
  paintTerrainType: TerrainType
}
const initialState: PaintModeState = {
  isBrushDown: false,
  paintTerrainType: 'Ground',
}

export const paintModeSlice = createSlice({
  name: 'paintMode',
  initialState,
  reducers: {
    updateIsBrushDown: (state, action: PayloadAction<boolean>) => {
      state.isBrushDown = action.payload
    },
    updatePaintTerrainType: (state, action: PayloadAction<TerrainType>) => {
      state.paintTerrainType = action.payload
    },
  },
})

export const paintTileAtCursor = (): DesignerThunk => (dispatch, getState) => {
  const state = getState()
  if (!state.paintMode.isBrushDown) {
    return
  }
  const position = state.designerCursor.cursorTile
  const newTerrain = state.paintMode.paintTerrainType
  if (!position) {
    return
  }
  if (
    state.map.mapDefinition.layers
      .filter(l => l.gridId === position[2])
      .some(l => l.grid[position[1]][position[0]].terrainType === newTerrain)
  ) {
    return
  }
  dispatch(placeTerrainTile({ newTerrain, position }))
}

export const { updateIsBrushDown, updatePaintTerrainType } =
  paintModeSlice.actions

export default paintModeSlice.reducer
