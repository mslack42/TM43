'use client'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/common/Dialog'
import { useState } from 'react'
import { GridDefinition } from '../../mapspace/types'
import { useDesigner } from '../context/DesignerContext'
export const ResizeDialog = ({
  layer,
  open,
  setOpen,
}: {
  layer: GridDefinition
  open: boolean
  setOpen: (_b: boolean) => void
}) => {
  const { mapDefinition, setMapDefinition } = useDesigner()
  const oldX = layer.grid[0].length
  const oldY = layer.grid.length
  const [newX, setNewX] = useState(oldX)
  const [newY, setNewY] = useState(oldY)
  const resize = (x: number, y: number) => {
    setMapDefinition({
      ...mapDefinition,
      layers: mapDefinition.layers.map(l => {
        if (l.gridId !== layer.gridId) {
          return l
        }
        const newGrid = Array(y)
          .fill(null)
          .map(r =>
            Array(x)
              .fill(null)
              .map(c => c),
          )
        for (let j = 0; j < newY; j++) {
          for (let i = 0; i < newX; i++) {
            if (i < oldX && j < oldY) {
              newGrid[j][i] = layer.grid[j][i]
            } else {
              newGrid[j][i] = layer.grid[oldY - 1][oldX - 1]
            }
          }
        }

        return { ...l, grid: newGrid }
      }),
    })
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
