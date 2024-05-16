'use client'

import { CursorTileCapture } from '@/components/designer/common/CursorTileCapture'
import {
  useDesignerDispatch,
  useDesignerSelector,
} from '@/stores/designer/hooks'
import { placeObject } from '@/stores/designer/mapSlice'
import {
  deselectObjectAtCursor,
  selectObjectAtCursor,
} from '@/stores/designer/selectModeSlice'
import { XYLCoords } from '../../mapspace/types'

type Props = { position: XYLCoords }
export const ObjectInteractivity = ({ position }: Props) => {
  const cursorMode = useDesignerSelector(
    state => state.designerCursor.cursorMode,
  )
  return (
    <CursorTileCapture cursorTile={position}>
      {cursorMode === 'Place' ? (
        <PlaceMode />
      ) : cursorMode === 'Select' ? (
        <SelectMode />
      ) : (
        <></>
      )}
    </CursorTileCapture>
  )
}

const PlaceMode = () => {
  const dispatch = useDesignerDispatch()
  const position = useDesignerSelector(state => state.designerCursor.cursorTile)
  const objectType = useDesignerSelector(state => state.placeMode.objectType)
  return (
    <div
      className='h-full w-full '
      onPointerDown={() => {
        position && dispatch(placeObject({ position, objectType }))
      }}
    ></div>
  )
}

const SelectMode = () => {
  const dispatch = useDesignerDispatch()
  return (
    <div
      className='h-full w-full '
      onPointerDown={() => {
        dispatch(selectObjectAtCursor())
      }}
      onPointerUp={() => {
        dispatch(deselectObjectAtCursor())
      }}
    ></div>
  )
}
