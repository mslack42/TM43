import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { useGameplayContext } from './GameplayContext'

export type PlayerCameraData = {
  cameraPosition: [number, number]
  setCameraPosition: (coords: [number, number]) => void
  currentCameraFocusId: number
}

export const CameraContext = createContext<PlayerCameraData>({
  cameraPosition: [0, 0],
  setCameraPosition: function (coords: [number, number]): void {
    throw new Error('Function not implemented.')
  },
  currentCameraFocusId: 0,
})

export const useCamera = () => useContext(CameraContext)

export function CameraContextProvider({ children }: PropsWithChildren) {
  const { initialMap } = useGameplayContext()
  const initialPlayerObject =
    initialMap.objects
      .map((obj, id) => {
        return { ...obj, id }
      })
      .filter(x => (x.objectType! = 'Player')).length > 0
      ? initialMap.objects
          .map((obj, id) => {
            return { ...obj, id }
          })
          .filter(x => (x.objectType = 'Player'))[0]
      : null
  const initialPlayerPos: [number, number] = (
    initialPlayerObject
      ? (initialPlayerObject.position.slice(0, 2) as [number, number])
      : [0, 0]
  ).map(v => -v * 32) as [number, number]

  const currentCameraFocusId = initialPlayerObject ? initialPlayerObject.id : -1
  const [cameraPosition, setCameraPosition] =
    useState<[number, number]>(initialPlayerPos)

  const value: PlayerCameraData = {
    currentCameraFocusId,
    cameraPosition,
    setCameraPosition,
  }
  return (
    <CameraContext.Provider value={value}>{children}</CameraContext.Provider>
  )
}
