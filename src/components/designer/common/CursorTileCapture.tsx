import { XYLCoords } from '@/components/mapspace/types'
import { PropsWithChildren } from 'react'
import { useDesignerCursor } from '../context/cursor/DesignerCursorContext'

type Props = {
  cursorTile: XYLCoords
}
export const CursorTileCapture = ({
  children,
  cursorTile,
}: PropsWithChildren<Props>) => {
  const { setCursorTile } = useDesignerCursor()
  return (
    <div
      className='h-full w-full'
      onPointerMove={() => setCursorTile(cursorTile)}
    >
      {children}
    </div>
  )
}
