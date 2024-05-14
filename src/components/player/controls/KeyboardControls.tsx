import { MapDefinition, ObjectDefinition } from '@/components/mapspace/types'
import { KeyboardEvent, PropsWithChildren, useEffect } from 'react'
import { useCamera } from '../context/CameraContext'
import { useGameplayContext } from '../context/GameplayContext'

export const KeyboardControls = ({ children }: PropsWithChildren) => {
  const { currentMapContext, setCurrentMapContext } = useGameplayContext()
  const { currentCameraFocusId } = useCamera()

  function handleKeydown(this: Window, ev: KeyboardEvent) {
    ev.preventDefault()
    ev.stopPropagation()

    const newContext: MapDefinition = {
      ...currentMapContext,
      objects: currentMapContext.objects.map((ob, id) => {
        if (id !== currentCameraFocusId) {
          return ob as ObjectDefinition
        }
        console.log(ev.key)
        switch (ev.key) {
          case 'ArrowRight': {
            return {
              ...ob,
              position: [ob.position[0] + 1, ob.position[1], ob.position[2]],
            }
          }
          case 'ArrowLeft': {
            return {
              ...ob,
              position: [ob.position[0] - 1, ob.position[1], ob.position[2]],
            }
          }
          case 'ArrowUp': {
            return {
              ...ob,
              position: [ob.position[0], ob.position[1] - 1, ob.position[2]],
            }
          }
          case 'ArrowDown': {
            return {
              ...ob,
              position: [ob.position[0], ob.position[1] + 1, ob.position[2]],
            }
          }
          default: {
            return {
              ...ob,
            }
          }
        }
      }),
    }

    console.log(newContext)
    setCurrentMapContext(newContext)
  }
  useEffect(() => {
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [currentMapContext, currentCameraFocusId])

  return <>{children}</>
}
