'use client'
import { useEffect, useState } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import { DesignerContextProvider } from './context/DesignerContext'

import { useDesignerCursor } from './context/cursor/DesignerCursorContext'
import { DesignerSideboard } from './controls/DesignerSideboard'

import { LayerGrid } from './LayerGrid'
import { ExportDialog } from './dialog/ExportDialog'
import { ImportDialog } from './dialog/ImportDialog'

export const DesignerWorkspace = () => {
  return (
    <div className='relative min-h-screen w-full overflow-hidden bg-black'>
      <DesignerContextProvider>
        <PanZoomWorkspace />
      </DesignerContextProvider>
    </div>
  )
}

function PanZoomWorkspace() {
  const [ready, setReady] = useState(false)
  const [windowDims, setWindowDims] = useState([0, 0])
  const { cursorMode } = useDesignerCursor()

  useEffect(() => {
    function handleResize() {
      setWindowDims([window.innerWidth, window.innerHeight])
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    setReady(true)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      {ready && (
        <>
          <TransformWrapper
            minScale={1}
            maxScale={10}
            initialScale={1}
            limitToBounds={false}
            initialPositionX={windowDims[0] / 4 - 400}
            initialPositionY={windowDims[1] / 4 - 400}
            smooth
            panning={{ disabled: cursorMode != 'Drag' }}
          >
            <TransformComponent
              wrapperStyle={{
                width: windowDims[0],
                height: windowDims[1],
              }}
            >
              <LayerGrid />
            </TransformComponent>
          </TransformWrapper>
          <DesignerSideboard />
        </>
      )}
      <ExportDialog />
      <ImportDialog />
    </>
  )
}
