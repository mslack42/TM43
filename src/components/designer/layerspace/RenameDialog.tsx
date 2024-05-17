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
import { renameLayer } from './../../../stores/designer/mapSlice'

export const RenameLayerDialog = ({
  layerId,
  open,
  setOpen,
}: {
  layerId: string
  open: boolean
  setOpen: (_b: boolean) => void
}) => {
  const layerIds = useDesignerSelector(
    state => state.map.mapDefinition.layers.map(l => l.gridId),
    (a, b) => a.length === b.length && a.every((v, i) => v === b[i]),
  )
  const dispatch = useDesignerDispatch()
  const [newName, setNewName] = useState(layerId)
  const rename = (newName: string) => {
    dispatch(renameLayer({ oldName: layerId, newName }))
  }

  return (
    <Dialog open={open} onOpenChange={ev => setOpen(ev)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`Rename "${layerId}"`}</DialogTitle>
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
            disabled={layerIds.includes(newName)}
          >
            Submit
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
