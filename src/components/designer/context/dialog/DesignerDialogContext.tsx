'use client'
import { createContext, useContext, PropsWithChildren, useState } from 'react'

export type DesignerDialogType = 'Export' | 'Import' | null
export type DesignerDialogContextData = {
  openDialog: DesignerDialogType
  setOpenDialog: (s: DesignerDialogType) => void
}

export const DesignerDialogContext = createContext<DesignerDialogContextData>({
  openDialog: null,
  setOpenDialog: function (_s: DesignerDialogType): void {
    throw new Error('Function not implemented.')
  },
})

export const useDesignerDialogs = () => useContext(DesignerDialogContext)

export function DesignerDialogProvider({ children }: PropsWithChildren) {
  const [openDialog, setOpenDialog] = useState<DesignerDialogType>(null)

  const value: DesignerDialogContextData = {
    openDialog,
    setOpenDialog,
  }

  return (
    <DesignerDialogContext.Provider value={value}>
      {children}
    </DesignerDialogContext.Provider>
  )
}
