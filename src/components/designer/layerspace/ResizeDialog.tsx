'use client'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/common/Dialog'
import {
  useDesignerDispatch,
  useDesignerSelector,
} from '@/stores/designer/hooks'
import { resizeLayer } from '@/stores/designer/mapSlice'
import { useState } from 'react'
export const ResizeDialog = ({
  layerId,
  open,
  setOpen,
}: {
  layerId: string
  open: boolean
  setOpen: (_b: boolean) => void
}) => {
  const dispatch = useDesignerDispatch()
  const oldX = useDesignerSelector(
    state =>
      state.map.mapDefinition.layers.filter(l => l.gridId === layerId)[0]
        .grid[0].length,
  )
  const oldY = useDesignerSelector(
    state =>
      state.map.mapDefinition.layers.filter(l => l.gridId === layerId)[0].grid
        .length,
  )
  const [newX, setNewX] = useState(oldX)
  const [newY, setNewY] = useState(oldY)
  const resize = (x: number, y: number) => {
    dispatch(resizeLayer({ gridId: layerId, newX, newY }))
  }

  return (
    <Dialog open={open} onOpenChange={ev => setOpen(ev)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`Resize "${layerId}"`}</DialogTitle>
        </DialogHeader>
        <input
          type='number'
          placeholder={oldX.toString()}
          className='border-2'
          value={newX}
          onChange={ev => {
            setNewX(Number(ev.target.value))
          }}
        ></input>
        <input
          type='number'
          placeholder={oldY.toString()}
          className='border-2'
          value={newY}
          onChange={ev => {
            setNewY(Number(ev.target.value))
          }}
        ></input>
        <DialogFooter>
          <button
            onClick={() => {
              resize(newX, newY)
              setOpen(false)
            }}
            disabled={newX <= 0 || newY <= 0}
          >
            Submit
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
