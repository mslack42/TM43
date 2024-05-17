'use client'

import { XYLCoords } from '../../mapspace/types'
import { CursorTileCapture } from '../common/CursorTileCapture'

type Props = {
  position: XYLCoords
}

export const TileInteractivity = ({ position }: Props) => {
  return (
    <CursorTileCapture cursorTile={position}>
      <div className='h-full w-full'></div>
    </CursorTileCapture>
  )
}
