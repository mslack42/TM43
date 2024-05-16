'use client'
import { useDesignerSelector } from '@/stores/designer/hooks'
import { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import { store } from './../../stores/designer/store'
import { DesignerContextProvider } from './context/DesignerContext'
import { DesignerSideboard } from './controls/DesignerSideboard'
import { ExportDialog } from './dialog/ExportDialog'
import { ImportDialog } from './dialog/ImportDialog'
import { LayerGrid } from './LayerGrid'

export const DesignerWorkspace = () => {
  return (
    <div className='relative min-h-screen w-full overflow-hidden bg-black'>
      <Provider store={store}>
        <DesignerContextProvider>
          <PanZoomWorkspace />
        </DesignerContextProvider>
      </Provider>
    </div>
  )
}

function PanZoomWorkspace() {
  const [ready, setReady] = useState(false)
  const [windowDims, setWindowDims] = useState([0, 0])
  const cursorMode = useDesignerSelector(
    state => state.designerCursor.cursorMode,
  )

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
