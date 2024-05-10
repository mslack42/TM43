'use client'
import { ObjectDefinition, XYLCoords } from '../../types'
import { ObjectDisplay } from './ObjectDisplay'
import { ObjectInteractivity } from './ObjectInteractivity'

type Props = {
  object?: ObjectDefinition
  position: XYLCoords
}
export const ObjectTile = ({ object, position }: Props) => {
  return (
    <div className='relative'>
      <div style={{ height: 32, width: 32 }}>
        {object && <ObjectDisplay object={object} />}
      </div>
      <div className='absolute bottom-0 left-0 right-0 top-0'>
        <ObjectInteractivity position={position} />
      </div>
    </div>
  )
}
