import { XYLCoords } from '@/components/mapspace/types'
import { updateCursorTile } from '@/stores/designer/designerCursorSlice'
import { useDesignerDispatch } from '@/stores/designer/hooks'
import { PropsWithChildren } from 'react'

type Props = {
  cursorTile: XYLCoords
}
export const CursorTileCapture = ({
  children,
  cursorTile,
}: PropsWithChildren<Props>) => {
  const dispatch = useDesignerDispatch()
  return (
    <div
      className='h-full w-full'
      onPointerEnter={() => dispatch(updateCursorTile(cursorTile))}
    >
      {children}
    </div>
  )
}
