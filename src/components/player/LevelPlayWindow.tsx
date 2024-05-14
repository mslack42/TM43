'use client'
import { MapContextProvider } from '@/components/mapspace/context/MapContext'
import { MapDefinition } from '@/components/mapspace/types'
import { LevelPlayer } from '@/components/player/LevelPlayer'
import {
  GameplayContextProvider,
  useGameplayContext,
} from './context/GameplayContext'
import { KeyboardControls } from './controls/KeyboardControls'

export function LevelPlayWindow({ level }: { level: MapDefinition }) {
  return (
    <MapContextProvider tileMode='Gameplay'>
      <GameplayContextProvider initialMap={level}>
        <KeyboardControls>
          <GameWindow></GameWindow>
        </KeyboardControls>
      </GameplayContextProvider>
    </MapContextProvider>
  )
}

function GameWindow() {
  const { gamestate } = useGameplayContext()

  const cameraTranslation = [
    gamestate.camera.position[0] + 240 - 16,
    gamestate.camera.position[1] + 160 - 16,
  ]

  return (
    <div
      className='relative overflow-hidden bg-black'
      style={{ width: 480, height: 320 }}
    >
      <div
        className='absolute h-full w-full'
        style={{
          left: cameraTranslation[0],
          top: cameraTranslation[1],
        }}
      >
        <LevelPlayer />
      </div>
    </div>
  )
}
