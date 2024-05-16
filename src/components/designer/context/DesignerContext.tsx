'use client'
import { MapContextProvider } from '@/components/mapspace/context/MapContext'
import { PropsWithChildren } from 'react'
import { DesignerDialogProvider } from './dialog/DesignerDialogContext'

export function DesignerContextProvider({ children }: PropsWithChildren) {
  return (
    <MapContextProvider tileMode='Designer'>
      <DesignerDialogProvider>{children}</DesignerDialogProvider>
    </MapContextProvider>
  )
}
