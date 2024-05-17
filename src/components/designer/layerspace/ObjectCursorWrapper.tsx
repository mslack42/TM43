'use client'
import {
  useDesignerDispatch,
  useDesignerSelector,
} from '@/stores/designer/hooks'
import { placeObjectAtCursor } from '@/stores/designer/placeModeSlice'
import {
  deselectObjectAtCursor,
  selectObjectAtCursor,
} from '@/stores/designer/selectModeSlice'
import { HTMLAttributes, PropsWithChildren } from 'react'

export const ObjectCursorWrapper = (props: PropsWithChildren) => {
  const cursorMode = useDesignerSelector(
    state => state.designerCursor.cursorMode,
  )

  return (
    <div
      className={
        'absolute left-0 top-0 ' +
        (cursorMode !== 'Place' && cursorMode !== 'Select'
          ? ' pointer-events-none'
          : '')
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
  const x = useDesignerSelector(state => state.designerCursor.cursorTile)
  const dispatch = useDesignerDispatch()

  const events: HTMLAttributes<HTMLDivElement> =
    cursorMode === 'Place'
      ? {
          onPointerDown: () => {
            console.log(x)
            dispatch(placeObjectAtCursor())
          },
        }
      : cursorMode === 'Select'
        ? {
            onPointerDown: () => {
              console.log(x)
              dispatch(selectObjectAtCursor())
            },
            onPointerUp: () => {
              dispatch(deselectObjectAtCursor())
            },
          }
        : {}

  return (
    <div className='h-full w-full' {...events}>
      {props.children}
    </div>
  )
}
