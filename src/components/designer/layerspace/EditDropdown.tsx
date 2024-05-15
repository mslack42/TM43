'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/common/DropdownMenu'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import { GridDefinition } from '../../mapspace/types'
import { RenameLayerDialog } from './RenameDialog'
import { ResizeDialog } from './ResizeDialog'

export const EditDropdown = ({ layer }: { layer: GridDefinition }) => {
  const [rename, setRename] = useState(false)
  const [resize, setResize] = useState(false)
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Pencil className='p-1' />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onSelect={() => {
              setRename(true)
            }}
          >
            Rename layer...
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              setResize(true)
            }}
          >
            Resize layer...
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <RenameLayerDialog open={rename} setOpen={setRename} layer={layer} />
      <ResizeDialog open={resize} setOpen={setResize} layer={layer} />
    </>
  )
}
