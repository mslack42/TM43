import { CursorMode } from '@/components/designer/types'
import { XYLCoords } from '@/components/mapspace/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type DesignerCursorState = {
  cursorMode: CursorMode
  cursorTile: XYLCoords | null
}
const initialState: DesignerCursorState = {
  cursorMode: 'Drag',
  cursorTile: null,
}

export const designerCursorSlice = createSlice({
  name: 'designerCursor',
  initialState,
  reducers: {
    updateCursorMode: (state, action: PayloadAction<CursorMode>) => {
      state.cursorMode = action.payload
    },
    updateCursorTile: (state, action: PayloadAction<XYLCoords | null>) => {
      state.cursorTile = action.payload
    },
  },
})

export const { updateCursorMode, updateCursorTile } =
  designerCursorSlice.actions

export default designerCursorSlice.reducer
