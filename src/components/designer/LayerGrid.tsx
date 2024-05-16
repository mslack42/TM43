'use client'

import {
  useDesignerDispatch,
  useDesignerSelector,
} from '@/stores/designer/hooks'
import { updateIsBrushDown } from '@/stores/designer/paintModeSlice'
import { unselectObject } from '@/stores/designer/selectModeSlice'
import { Layer } from './layerspace/Layer'

export const LayerGrid = () => {
  const mapDefinition = useDesignerSelector(state => state.map.mapDefinition)
  const dispatch = useDesignerDispatch()

  return (
    <div
      className='flex flex-row gap-10 p-96'
      onPointerUp={() => {
        dispatch(updateIsBrushDown(false))
      }}
      onPointerLeave={() => {
        dispatch(unselectObject())
      }}
    >
      {mapDefinition.layers.map(l => (
        <Layer layer={l} key={l.gridId} />
      ))}
    </div>
  )
}
