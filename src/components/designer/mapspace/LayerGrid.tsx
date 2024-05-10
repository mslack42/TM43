'use client'
import { useDesigner } from '../context/DesignerContext'
import { Layer } from './Layer'
import { usePaintMode } from '../context/cursor/PaintModeContext'
import { useSelectMode } from '../context/cursor/SelectModeContext'

export const LayerGrid = () => {
  const { mapDefinition } = useDesigner()
  const { setIsBrushDown } = usePaintMode()
  const { unselectObject } = useSelectMode()

  return (
    <div
      className='flex flex-row gap-10 p-96'
      onPointerUp={() => {
        setIsBrushDown(false)
      }}
      onPointerLeave={() => {
        unselectObject()
      }}
    >
      {mapDefinition.layers.map((l, i) => (
        <Layer layer={l} key={i} />
      ))}
    </div>
  )
}
