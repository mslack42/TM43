'use client'

import { CursorTileCapture } from '@/components/designer/common/CursorTileCapture'
import { XYLCoords } from '../../mapspace/types'

type Props = { position: XYLCoords }
export const ObjectInteractivity = ({ position }: Props) => {
  return (
    <CursorTileCapture cursorTile={position}>
      <div className='h-full w-full '></div>
    </CursorTileCapture>
  )
}
