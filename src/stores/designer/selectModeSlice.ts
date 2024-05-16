import { ObjectDefinition } from '@/components/mapspace/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { updateMap } from './mapSlice'
import { DesignerThunk } from './store'

type SelectModeState = {
  selectedObject: ObjectDefinition | null
}
const initialState: SelectModeState = {
  selectedObject: null,
}

export const selectModeSlice = createSlice({
  name: 'selectMode',
  initialState,
  reducers: {
    selectObject: (state, action: PayloadAction<ObjectDefinition>) => {
      state.selectedObject = action.payload
    },
    deselectObject: state => {
      state.selectedObject = null
    },
  },
})

export const deselectObjectAtCursor =
  (): DesignerThunk => (dispatch, getState) => {
    const state = getState()

    if (!state.selectMode.selectedObject || !state.designerCursor.cursorTile) {
      return
    }
    dispatch(
      updateMap({
        ...state.map.mapDefinition,
        objects: [
          ...state.map.mapDefinition.objects,
          {
            ...state.selectMode.selectedObject,
            position: state.designerCursor.cursorTile,
          },
        ],
      }),
    )
    dispatch(deselectObject())
  }
export const unselectObject = (): DesignerThunk => (dispatch, getState) => {
  const state = getState()
  if (!state.selectMode.selectedObject) {
    return
  }
  dispatch(
    updateMap({
      ...state.map.mapDefinition,
      objects: [
        ...state.map.mapDefinition.objects,
        {
          ...state.selectMode.selectedObject,
        },
      ],
    }),
  )
  dispatch(deselectObject())
}
export const selectObjectAtCursor =
  (): DesignerThunk => (dispatch, getState) => {
    const state = getState()
    if (state.selectMode.selectedObject || !state.designerCursor.cursorTile) {
      return
    }
    const currObjs = state.map.mapDefinition.objects
      .filter(obj => obj.position[0] === state.designerCursor.cursorTile![0])
      .filter(obj => obj.position[1] === state.designerCursor.cursorTile![1])
      .filter(obj => obj.position[2] === state.designerCursor.cursorTile![2])
    if (currObjs.length === 0) {
      return
    }
    dispatch(
      updateMap({
        ...state.map.mapDefinition,
        objects: state.map.mapDefinition.objects.filter(
          x =>
            x.position[0] !== state.designerCursor.cursorTile![0] ||
            x.position[1] !== state.designerCursor.cursorTile![1] ||
            x.position[2] !== state.designerCursor.cursorTile![2],
        ),
      }),
    )
    dispatch(selectObject(currObjs[0]))
  }

export const { selectObject, deselectObject } = selectModeSlice.actions

export default selectModeSlice.reducer
