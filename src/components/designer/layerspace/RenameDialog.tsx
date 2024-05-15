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

export const RenameLayerDialog = ({
  layer,
  open,
  setOpen,
}: {
  layer: GridDefinition
  open: boolean
  setOpen: (_b: boolean) => void
}) => {
  const { mapDefinition, setMapDefinition } = useDesigner()
  const [newName, setNewName] = useState(layer.gridId)
  const rename = (newName: string) => {
    setMapDefinition({
      ...mapDefinition,
      layers: mapDefinition.layers.map(l => {
        if (l.gridId !== layer.gridId) {
          return l
        }
        return { ...l, gridId: newName }
      }),
      objects: mapDefinition.objects.map(o => {
        if (o.position[2] !== layer.gridId) {
          return o
        }
        return {
          ...o,
          position: [o.position[0], o.position[1], newName],
        }
      }),
    })
  }

  return (
    <Dialog open={open} onOpenChange={ev => setOpen(ev)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`Rename "${layer.gridId}"`}</DialogTitle>
        </DialogHeader>
        <input
          type='text'
          placeholder='Layer name'
          className='border-2'
          value={newName}
          onChange={ev => {
            setNewName(ev.target.value)
          }}
        ></input>
        <DialogFooter>
          <button
            onClick={() => {
              rename(newName)
              setOpen(false)
            }}
            disabled={mapDefinition.layers.map(l => l.gridId).includes(newName)}
          >
            Submit
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
