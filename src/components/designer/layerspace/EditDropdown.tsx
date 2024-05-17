'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/common/DropdownMenu'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import { RenameLayerDialog } from './RenameDialog'
import { ResizeDialog } from './ResizeDialog'

export const EditDropdown = ({ layerId }: { layerId: string }) => {
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
      <RenameLayerDialog open={rename} setOpen={setRename} layerId={layerId} />
      <ResizeDialog open={resize} setOpen={setResize} layerId={layerId} />
    </>
  )
}
