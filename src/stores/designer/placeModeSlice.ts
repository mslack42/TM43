import { ObjectType } from '@/components/mapspace/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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

export const { updatePlaceObjectType } = placeModeSlice.actions

export default placeModeSlice.reducer
