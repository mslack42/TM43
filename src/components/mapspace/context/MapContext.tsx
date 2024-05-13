import { createContext, PropsWithChildren, useContext } from 'react'
import { TileMode } from '../types'

export type MapContextData = {
  tileMode: TileMode
}

export const MapContext = createContext<MapContextData>({
  tileMode: 'Designer',
})

export const useMapContext = () => useContext(MapContext)

type Props = {
  tileMode: TileMode
}
export function MapContextProvider({
  children,
  tileMode,
}: PropsWithChildren<Props>) {
  return (
    <MapContext.Provider value={{ tileMode }}>{children}</MapContext.Provider>
  )
}
