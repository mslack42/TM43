'use client'
import { createContext, useContext, PropsWithChildren, useState } from 'react'
import { defaultMapDefintion } from './defaultMapDefintion'
import { MapDefinition } from '../types'
import { DesignerCursorContextProvider } from './cursor/DesignerCursorContext'
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
      <DesignerDialogProvider>
        <DesignerCursorContextProvider>
          {children}
        </DesignerCursorContextProvider>
      </DesignerDialogProvider>
    </DesignerContext.Provider>
  )
}
