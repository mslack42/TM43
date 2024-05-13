'use client'

import { CursorTileCapture } from '@/components/designer/common/CursorTileCapture'
import { useDesignerCursor } from '@/components/designer/context/cursor/DesignerCursorContext'
import { usePlaceMode } from '@/components/designer/context/cursor/PlaceModeContext'
import { useSelectMode } from '@/components/designer/context/cursor/SelectModeContext'
import { XYLCoords } from '../../mapspace/types'

type Props = { position: XYLCoords }
export const ObjectInteractivity = ({ position }: Props) => {
  const { cursorMode } = useDesignerCursor()
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
  const { placeObject } = usePlaceMode()
  return (
    <div
      className='h-full w-full '
      onPointerDown={() => {
        placeObject()
      }}
    ></div>
  )
}

const SelectMode = () => {
  const { selectObject, deselectObject } = useSelectMode()
  return (
    <div
      className='h-full w-full '
      onPointerDown={() => {
        selectObject()
      }}
      onPointerUp={() => {
        deselectObject()
      }}
    ></div>
  )
}
