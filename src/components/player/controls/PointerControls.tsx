import { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { useGameplayContext } from '../context/GameplayContext'

export const PointerControls = ({ children }: PropsWithChildren) => {
  const [fakeDevice, setFakeDevice] = useState<'GBC' | 'GBA'>('GBC')
  const content = (
    <div className='flex flex-row justify-center'>
      <div className='flex flex-col'>
        <button
          onClick={() => setFakeDevice(fakeDevice === 'GBA' ? 'GBC' : 'GBA')}
        >
          {fakeDevice}
        </button>
        <div>{children}</div>
      </div>
    </div>
  )

  const [scale, setScale] = useState(1)
  const innerref = useRef<HTMLDivElement>(null)
  const outerref = useRef<HTMLDivElement>(null)
  const adjustScale = () => {
    if (innerref.current && outerref.current) {
      setScale(
        Math.min(
          outerref.current.clientWidth / innerref.current.clientWidth,
          outerref.current.clientHeight / innerref.current.clientHeight,
        ),
      )
    }
  }

  useEffect(() => {
    window.addEventListener('resize', () => adjustScale())
    adjustScale()
    return window.removeEventListener('resize', () => adjustScale())
  }, [fakeDevice])

  return (
    <div className='h-screen w-full' ref={outerref}>
      <div id='scaler' style={{ scale: scale, transformOrigin: '0 0' }}>
        <div className='h-fit w-fit' ref={innerref}>
          {fakeDevice === 'GBA' && (
            <div className='flex flex-row rounded-lg bg-purple-500'>
              <div className='flex flex-col justify-center p-2'>
                <DPad />
              </div>
              <div className='pb-8'>{content}</div>
              <div className='flex flex-col justify-center p-2'>
                <ABButtons />
              </div>
            </div>
          )}
          {fakeDevice === 'GBC' && (
            <div className='flex flex-col rounded-lg bg-yellow-500'>
              <div className='p-4'>
                <div>{content}</div>
              </div>
              <div className='flex min-h-60 flex-row justify-evenly pt-8 '>
                <DPad />
                <ABButtons />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const DPad = () => {
  const { gamestateDispatch } = useGameplayContext()
  return (
    <div className='relative m-2' style={{ height: 96, width: 96 }}>
      <button
        className='absolute bg-blue-400'
        style={{ top: 0, left: 32, height: 32, width: 32 }}
        onClick={evt => {
          evt.preventDefault()
          gamestateDispatch({ action: 'playermove', direction: 'North' })
        }}
      >
        |
      </button>
      <button
        className='absolute  bg-blue-400'
        style={{ top: 32, left: 0, height: 32, width: 32 }}
        onClick={evt => {
          evt.preventDefault()
          gamestateDispatch({ action: 'playermove', direction: 'West' })
        }}
      >
        --
      </button>
      <button
        className='absolute bg-blue-400'
        style={{ top: 32, right: 0, height: 32, width: 32 }}
        onClick={evt => {
          evt.preventDefault()
          gamestateDispatch({ action: 'playermove', direction: 'East' })
        }}
      >
        --
      </button>
      <button
        className='absolute bg-blue-400'
        style={{ bottom: 0, left: 32, height: 32, width: 32 }}
        onClick={evt => {
          evt.preventDefault()
          gamestateDispatch({ action: 'playermove', direction: 'South' })
        }}
      >
        |
      </button>
    </div>
  )
}

const ABButtons = () => {
  return (
    <div className='relative' style={{ height: 96, width: 96 }}>
      <button
        className='absolute rounded-full bg-red-500'
        style={{ top: 24, right: 8, height: 32, width: 32 }}
      >
        A
      </button>
      <button
        className='absolute rounded-full bg-green-500'
        style={{ bottom: 24, left: 8, height: 32, width: 32 }}
      >
        B
      </button>
    </div>
  )
}
