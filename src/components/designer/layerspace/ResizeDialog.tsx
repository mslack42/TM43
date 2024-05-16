'use client'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/common/Dialog'
import { useDesignerDispatch } from '@/stores/designer/hooks'
import { resizeLayer } from '@/stores/designer/mapSlice'
import { useState } from 'react'
import { GridDefinition } from '../../mapspace/types'
export const ResizeDialog = ({
  layer,
  open,
  setOpen,
}: {
  layer: GridDefinition
  open: boolean
  setOpen: (_b: boolean) => void
}) => {
  const dispatch = useDesignerDispatch()
  const oldX = layer.grid[0].length
  const oldY = layer.grid.length
  const [newX, setNewX] = useState(oldX)
  const [newY, setNewY] = useState(oldY)
  const resize = (x: number, y: number) => {
    dispatch(resizeLayer({ gridId: layer.gridId, newX, newY }))
  }

  return (
    <Dialog open={open} onOpenChange={ev => setOpen(ev)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`Resize "${layer.gridId}"`}</DialogTitle>
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
