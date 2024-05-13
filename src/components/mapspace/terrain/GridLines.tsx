'use client'
export const GridLines = () => {
  return (
    <div className='absolute bottom-0 left-0 right-0 top-0'>
      <div className='relative h-full w-full'>
        <div
          className='absolute bottom-0 left-0 top-0 bg-red-600 opacity-50'
          style={{ width: 1 }}
        ></div>
        <div
          className='absolute left-0 right-0 top-0 bg-red-600 opacity-50'
          style={{ height: 1 }}
        ></div>
      </div>
    </div>
  )
}
