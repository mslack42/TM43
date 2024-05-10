'use client'
import { CursorTileCapture } from '../../common/CursorTileCapture'
import { useDesignerCursor } from '../../context/DesignerCursorContext'
import { usePaintMode } from '../../context/PaintModeContext'
import { XYLCoords } from '../../types'

type Props = {
  position: XYLCoords
}

export const TileInteractivity = ({ position }: Props) => {
  const { cursorMode } = useDesignerCursor()
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
  const { paintTile, isBrushDown, setIsBrushDown } = usePaintMode()
  return (
    <div
      className='h-full w-full '
      onPointerDown={() => {
        setIsBrushDown(true)
        paintTile()
      }}
      onPointerUp={() => {
        setIsBrushDown(false)
      }}
      onPointerMove={() => {
        if (isBrushDown) {
          paintTile()
        }
      }}
      onPointerEnter={() => {
        if (isBrushDown) {
          paintTile()
        }
      }}
      onPointerLeave={() => {
        if (isBrushDown) {
          paintTile()
        }
      }}
    ></div>
  )
}
