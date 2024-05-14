'use client'

import { ObjectInteractivity } from '../../designer/mapspace/ObjectInteractivity'
import { useMapContext } from '../context/MapContext'
import { ObjectType, XYLCoords } from '../types'
import { ObjectDisplay } from './ObjectDisplay'

type Props = {
  position?: XYLCoords
  objectType?: ObjectType
}
export const ObjectTile = ({ objectType, position }: Props) => {
  const { tileMode } = useMapContext()
  return (
    <div className='relative'>
      <div style={{ height: 32, width: 32 }}>
        {objectType && <ObjectDisplay objectType={objectType} />}
      </div>
      {tileMode === 'Designer' && position && (
        <div className='absolute bottom-0 left-0 right-0 top-0'>
          <ObjectInteractivity position={position} />
        </div>
      )}
    </div>
  )
}
