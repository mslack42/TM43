'use client'

import { ObjectInteractivity } from '../../designer/mapspace/ObjectInteractivity'
import { useMapContext } from '../context/MapContext'
import { ObjectDefinition, XYLCoords } from '../types'
import { ObjectDisplay } from './ObjectDisplay'

type Props = {
  object?: ObjectDefinition
  position?: XYLCoords
}
export const ObjectTile = ({ object, position }: Props) => {
  const { tileMode } = useMapContext()
  return (
    <div className='relative'>
      <div style={{ height: 32, width: 32 }}>
        {object && <ObjectDisplay object={object} />}
      </div>
      {tileMode === 'Designer' && position && (
        <div className='absolute bottom-0 left-0 right-0 top-0'>
          <ObjectInteractivity position={position} />
        </div>
      )}
    </div>
  )
}
