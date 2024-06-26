'use client'
import { TerrainType } from '@/components/mapspace/types'
import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { useDesigner } from '../DesignerContext'
import { useDesignerCursor } from './DesignerCursorContext'

type PaintModeContextData = {
  isBrushDown: boolean
  setIsBrushDown: (newState: boolean) => void
  terrainType: TerrainType
  setTerrainType: (newTerrain: TerrainType) => void
  paintTile: () => void
}
const PaintModeContext = createContext<PaintModeContextData>({
  isBrushDown: false,
  setIsBrushDown: function (_newState: boolean): void {
    throw new Error('Function not implemented.')
  },
  paintTile: function (): void {
    throw new Error('Function not implemented.')
  },
  terrainType: 'Ground',
  setTerrainType: function (_newTerrain: TerrainType): void {
    throw new Error('Function not implemented.')
  },
})

export const usePaintMode = () => useContext(PaintModeContext)

export function PaintModeContextProvider({ children }: PropsWithChildren) {
  const [isBrushDown, setIsBrushDown] = useState(false)
  const [terrainType, setTerrainType] = useState<TerrainType>('Ice')
  const { mapDefinition, setMapDefinition } = useDesigner()
  const { cursorTile } = useDesignerCursor()

  const paintTile = () => {
    if (!cursorTile) {
      return
    }
    let newMapDef = { ...mapDefinition }
    newMapDef.layers = newMapDef.layers.map(l => {
      if (l.gridId !== cursorTile[2]) {
        return l
      }
      const newL = { ...l }
      newL.grid[cursorTile[1]][cursorTile[0]] = {
        ...newL.grid[cursorTile[1]][cursorTile[0]],
        terrainType,
      }
      return newL
    })
    setMapDefinition(newMapDef)
  }

  const value: PaintModeContextData = {
    isBrushDown,
    setIsBrushDown,
    terrainType,
    setTerrainType,
    paintTile,
  }

  return (
    <PaintModeContext.Provider value={value}>
      {children}
    </PaintModeContext.Provider>
  )
}
