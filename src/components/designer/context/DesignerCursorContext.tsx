'use client'
import { createContext, useContext, PropsWithChildren, useState } from 'react'
import { CursorMode, XYLCoords } from '../types'

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
    <CursorContext.Provider value={value}>{children}</CursorContext.Provider>
  )
}
