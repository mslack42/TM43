'use client'

import {
  useDesignerDispatch,
  useDesignerSelector,
} from '@/stores/designer/hooks'
import { updateIsBrushDown } from '@/stores/designer/paintModeSlice'
import { unselectObject } from '@/stores/designer/selectModeSlice'
import { Layer } from './layerspace/Layer'

export const LayerGrid = () => {
  const layerCount = useDesignerSelector(
    state => state.map.mapDefinition.layers.length,
  )
  const layerIds = Array(layerCount)
    .fill(null)
    .map((_, i) => i)

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
      {layerIds.map(l => (
        <Layer layerIndex={l} key={l} />
      ))}
    </div>
  )
}
