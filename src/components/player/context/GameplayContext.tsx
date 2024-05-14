import { MapDefinition } from '@/components/mapspace/types'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'
import { RenderMapDefinition } from '../types'
import { CameraContextProvider } from './CameraContext'

export type GameplayContextData = {
  initialMap: MapDefinition
  currentMapContext: MapDefinition
  setCurrentMapContext: (next: MapDefinition) => void
  currentRenderContext: RenderMapDefinition
  setCurrentRenderContext: (next: RenderMapDefinition) => void
  ticker: boolean
}

export const GameplayContext = createContext<GameplayContextData>({
  initialMap: {
    name: '',
    objects: [],
    layers: [],
  },
  currentMapContext: {
    name: '',
    objects: [],
    layers: [],
  },
  setCurrentMapContext: function (next: MapDefinition): void {
    throw new Error('Function not implemented.')
  },
  currentRenderContext: {
    objects: [],
  },
  setCurrentRenderContext: function (next: RenderMapDefinition): void {
    throw new Error('Function not implemented.')
  },
  ticker: false,
})

export const useGameplayContext = () => useContext(GameplayContext)

type Props = {
  initialMap: MapDefinition
}
export function GameplayContextProvider({
  children,
  initialMap,
}: PropsWithChildren<Props>) {
  const [currentMapContext, setCurrentMapContext] = useState(initialMap)
  const [currentRenderContext, setCurrentRenderContext] =
    useState<RenderMapDefinition>({
      objects: initialMap.objects.map((ob, i) => {
        return {
          id: i,
          objectType: ob.objectType,
          renderCoords: [ob.position[0] * 32, ob.position[1] * 32],
          floorId: ob.position[2],
        }
      }),
    })
  const [ticker, setTicker] = useState(false)

  useEffect(() => {
    const ticktask = setTimeout(() => setTicker(!ticker), 30)
  }, [ticker])

  const value: GameplayContextData = {
    initialMap,
    currentMapContext,
    setCurrentMapContext,
    currentRenderContext,
    setCurrentRenderContext,
    ticker,
  }

  return (
    <GameplayContext.Provider value={value}>
      <CameraContextProvider>{children}</CameraContextProvider>
    </GameplayContext.Provider>
  )
}
