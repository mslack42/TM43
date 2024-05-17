import { ObjectType } from '@/components/mapspace/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { placeObject } from './mapSlice'
import { DesignerThunk } from './store'

type placeModeState = {
  objectType: ObjectType
}
const initialState: placeModeState = {
  objectType: 'Player',
}

export const placeModeSlice = createSlice({
  name: 'placeMode',
  initialState,
  reducers: {
    updatePlaceObjectType: (state, action: PayloadAction<ObjectType>) => {
      state.objectType = action.payload
    },
  },
})

export const placeObjectAtCursor =
  (): DesignerThunk => (dispatch, getState) => {
    const state = getState()

    const position = state.designerCursor.cursorTile
    const objectType = state.placeMode.objectType

    if (position) {
      dispatch(placeObject({ position, objectType }))
    }
  }

export const { updatePlaceObjectType } = placeModeSlice.actions

export default placeModeSlice.reducer
