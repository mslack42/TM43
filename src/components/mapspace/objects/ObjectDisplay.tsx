'use client'

import { ObjectType } from '../types'

export const ObjectDisplay = ({ objectType }: { objectType: ObjectType }) => {
  const getTempContents = (objectType: ObjectType) => {
    switch (objectType) {
      case 'Player': {
        return 'P'
      }
      case 'Goal': {
        return 'G'
      }
      default: {
        return 'err'
      }
    }
  }
  return (
    <div className='h-full w-full rounded-xl bg-slate-500 bg-opacity-50 text-center align-middle'>
      {getTempContents(objectType)}
    </div>
  )
}
