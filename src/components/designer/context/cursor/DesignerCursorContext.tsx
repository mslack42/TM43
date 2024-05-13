'use client'
import { XYLCoords } from '@/components/mapspace/types'
import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { CursorMode } from '../../types'
import { PaintModeContextProvider } from './PaintModeContext'
import { PlaceModeContextProvider } from './PlaceModeContext'
import { SelectModeContextProvider } from './SelectModeContext'

export type CursorContextData = {
  cursorMode: CursorMode
  setCursorMode: (newMode: CursorMode) => void
  cursorTile: XYLCoords | null
  setCursorTile: (t: XYLCoords | null) => void
}

export const CursorContext = createContext<CursorContextData>({
  cursorMode: 'Drag',
  setCursorMode: function (_newMode: CursorMode): void {
    throw new Error('Function not implemented.')
  },
  cursorTile: null,
  setCursorTile: function (_t: XYLCoords | null): void {
    throw new Error('Function not implemented.')
  },
})

export const useDesignerCursor = () => useContext(CursorContext)

export function DesignerCursorContextProvider({ children }: PropsWithChildren) {
  const [cursorMode, setCursorMode] = useState<CursorMode>('Drag')
  const [cursorTile, _setCursorTile] = useState<XYLCoords | null>(null)
  const setCursorTile = (val: XYLCoords | null) => {
    _setCursorTile(val)
  }

  const value: CursorContextData = {
    cursorMode,
    setCursorMode,
    cursorTile,
    setCursorTile,
  }

  return (
    <CursorContext.Provider value={value}>
      <SelectModeContextProvider>
        <PlaceModeContextProvider>
          <PaintModeContextProvider>{children}</PaintModeContextProvider>
        </PlaceModeContextProvider>
      </SelectModeContextProvider>
    </CursorContext.Provider>
  )
}
