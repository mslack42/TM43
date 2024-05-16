'use client'

import {
  useDesignerDispatch,
  useDesignerSelector,
} from '@/stores/designer/hooks'
import {
  paintTileAtCursor,
  updateIsBrushDown,
} from '@/stores/designer/paintModeSlice'
import { XYLCoords } from '../../mapspace/types'
import { CursorTileCapture } from '../common/CursorTileCapture'

type Props = {
  position: XYLCoords
}

export const TileInteractivity = ({ position }: Props) => {
  const cursorMode = useDesignerSelector(
    state => state.designerCursor.cursorMode,
  )
  return (
    <CursorTileCapture cursorTile={position}>
      {cursorMode === 'Paint' ? (
        <PaintMode />
      ) : (
        <div className='h-full w-full'></div>
      )}
    </CursorTileCapture>
  )
}

const PaintMode = () => {
  const dispatch = useDesignerDispatch()
  const paintTile = () => {
    dispatch(paintTileAtCursor())
  }

  return (
    <div
      className='h-full w-full '
      onPointerDown={() => {
        dispatch(updateIsBrushDown(true))
        paintTile()
      }}
      onPointerUp={() => {
        dispatch(updateIsBrushDown(false))
      }}
      // onPointerMove={() => {
      //   paintTile()
      // }}
      onPointerEnter={() => {
        paintTile()
      }}
      // onPointerLeave={() => {
      //   paintTile()
      // }}
    ></div>
  )
}
