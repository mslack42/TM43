'use client'
import {
  useDesignerDispatch,
  useDesignerSelector,
} from '@/stores/designer/hooks'
import {
  paintTileAtCursor,
  updateIsBrushDown,
} from '@/stores/designer/paintModeSlice'
import { HTMLAttributes, PropsWithChildren } from 'react'

export const TerrainCursorWrapper = (props: PropsWithChildren) => {
  const cursorMode = useDesignerSelector(
    state => state.designerCursor.cursorMode,
  )
  return (
    <div
      className={
        'flex flex-col ' +
        (cursorMode !== 'Paint' ? ' pointer-events-none' : '')
      }
    >
      <EventWrap>{props.children}</EventWrap>
    </div>
  )
}

const EventWrap = (props: PropsWithChildren) => {
  const cursorMode = useDesignerSelector(
    state => state.designerCursor.cursorMode,
  )
  const dispatch = useDesignerDispatch()
  const paintTile = () => {
    dispatch(paintTileAtCursor())
  }

  const events: HTMLAttributes<HTMLDivElement> =
    cursorMode === 'Paint'
      ? {
          onPointerDown: () => {
            dispatch(updateIsBrushDown(true))
            paintTile()
          },
          onPointerUp: () => {
            dispatch(updateIsBrushDown(false))
          },
          onPointerMove: () => {
            paintTile()
          },
        }
      : {}

  return (
    <div className='h-full w-full' {...events}>
      {props.children}
    </div>
  )
}
