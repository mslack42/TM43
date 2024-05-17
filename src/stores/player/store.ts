import { configureStore, ThunkAction, UnknownAction } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {},
})

export type PlayerState = ReturnType<typeof store.getState>
export type PlayerDispatch = typeof store.dispatch
export type PlayerThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  PlayerState,
  unknown,
  UnknownAction
>
