import { PropsWithChildren, useEffect } from 'react'
import { useGameplayContext } from '../context/GameplayContext'

export const KeyboardControls = ({ children }: PropsWithChildren) => {
  const { gamestate, gamestateDispatch } = useGameplayContext()

  useEffect(() => {
    function handleKeydown(ev: KeyboardEvent) {
      ev.preventDefault()
      ev.stopPropagation()
      switch (ev.key) {
        case 'ArrowUp': {
          gamestateDispatch({ action: 'playermove', direction: 'North' })
          break
        }
        case 'ArrowDown': {
          gamestateDispatch({ action: 'playermove', direction: 'South' })
          break
        }
        case 'ArrowLeft': {
          gamestateDispatch({ action: 'playermove', direction: 'West' })
          break
        }
        case 'ArrowRight': {
          gamestateDispatch({ action: 'playermove', direction: 'East' })
          break
        }
        default: {
        }
      }
    }
    window.addEventListener('keydown', (ev: KeyboardEvent) => handleKeydown(ev))
    return () => window.removeEventListener('keydown', ev => handleKeydown(ev))
  }, [gamestate.camera, gamestateDispatch])

  return <>{children}</>
}
