import { MapDefinition } from '@/components/mapspace/types'
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react'
import { GameplayState, gameStateFromDesign } from '../types'

import {
  GameplayStateAction,
  GameplayStateReducer,
} from './GameplayStateReducer'

export type GameplayContextData = {
  initialMap: MapDefinition
  gamestate: GameplayState
  gamestateDispatch: Dispatch<GameplayStateAction>
}

export const GameplayContext = createContext<GameplayContextData>({
  initialMap: {
    name: '',
    objects: [],
    layers: [],
  },
  gamestate: {
    terrainMaps: [],
    objects: [],
    camera: {
      floorId: '',
      position: [0, 0],
    },
    activeObjectId: 0,
    actionObjectType: 'Player',
  },
  gamestateDispatch: function (value: GameplayStateAction): void {
    throw new Error('Function not implemented.')
  },
})

export const useGameplayContext = () => useContext(GameplayContext)

type Props = {
  initialMap: MapDefinition
}

export function GameplayContextProvider({
  children,
  initialMap,
}: PropsWithChildren<Props>) {
  const [gamestate, gamestateDispatch] = useReducer(
    GameplayStateReducer,
    gameStateFromDesign(initialMap),
  )
  const [ticker, setTicker] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      // TODO
      gamestateDispatch({ action: 'tick' })
      setTicker(!ticker)
    }, 30)
  }, [ticker])

  const { actualGamestate, actualGamestateDispatch } = useMemo(() => {
    return {
      actualGamestate: gamestate,
      actualGamestateDispatch: gamestateDispatch,
    }
  }, [gamestate, gamestateDispatch])

  const value: GameplayContextData = {
    initialMap,
    gamestate: actualGamestate,
    gamestateDispatch: actualGamestateDispatch,
  }

  return (
    <GameplayContext.Provider value={value}>
      {children}
    </GameplayContext.Provider>
  )
}
