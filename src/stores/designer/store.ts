import { configureStore, ThunkAction, UnknownAction } from '@reduxjs/toolkit'
import designerCursorSlice from './designerCursorSlice'
import mapSlice from './mapSlice'
import paintModeSlice from './paintModeSlice'
import placeModeSlice from './placeModeSlice'
import selectModeSlice from './selectModeSlice'

export const store = configureStore({
  reducer: {
    designerCursor: designerCursorSlice,
    selectMode: selectModeSlice,
    placeMode: placeModeSlice,
    paintMode: paintModeSlice,
    map: mapSlice,
  },
})

export type DesignerState = ReturnType<typeof store.getState>
export type DesignerDispatch = typeof store.dispatch
export type DesignerThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  DesignerState,
  unknown,
  UnknownAction
>
