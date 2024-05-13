'use client'
import { MapContextProvider } from '@/components/mapspace/context/MapContext'
import { MapDefinition } from '@/components/mapspace/types'
import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { DesignerCursorContextProvider } from './cursor/DesignerCursorContext'
import { defaultMapDefintion } from './defaultMapDefintion'
import { DesignerDialogProvider } from './dialog/DesignerDialogContext'

export type DesignerContextData = {
  mapDefinition: MapDefinition
  setMapDefinition: (newDef: MapDefinition) => void
}

export const DesignerContext = createContext<DesignerContextData>({
  mapDefinition: {
    objects: [],
    layers: [],
    name: '',
  },
  setMapDefinition: function (_newDef: MapDefinition): void {
    throw new Error('Function not implemented.')
  },
})

export const useDesigner = () => useContext(DesignerContext)

export function DesignerContextProvider({ children }: PropsWithChildren) {
  const [mapDefinition, setMapDefinition] =
    useState<MapDefinition>(defaultMapDefintion)

  const value: DesignerContextData = {
    mapDefinition,
    setMapDefinition,
  }

  return (
    <DesignerContext.Provider value={value}>
      <MapContextProvider tileMode='Designer'>
        <DesignerDialogProvider>
          <DesignerCursorContextProvider>
            {children}
          </DesignerCursorContextProvider>
        </DesignerDialogProvider>
      </MapContextProvider>
    </DesignerContext.Provider>
  )
}
