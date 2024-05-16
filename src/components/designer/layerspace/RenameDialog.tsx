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
import { useState } from 'react'
import { GridDefinition } from '../../mapspace/types'
import { renameLayer } from './../../../stores/designer/mapSlice'

export const RenameLayerDialog = ({
  layer,
  open,
  setOpen,
}: {
  layer: GridDefinition
  open: boolean
  setOpen: (_b: boolean) => void
}) => {
  const mapDefinition = useDesignerSelector(state => state.map.mapDefinition)
  const dispatch = useDesignerDispatch()
  const [newName, setNewName] = useState(layer.gridId)
  const rename = (newName: string) => {
    dispatch(renameLayer({ oldName: layer.gridId, newName }))
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
