'use client'

import {
  ObjectType,
  ObjectTypes,
  TerrainType,
  TerrainTypes,
} from '@/components/mapspace/types'
import { useDesignerCursor } from '../context/cursor/DesignerCursorContext'
import { usePaintMode } from '../context/cursor/PaintModeContext'
import { usePlaceMode } from '../context/cursor/PlaceModeContext'
import { useDesignerDialogs } from '../context/dialog/DesignerDialogContext'
import { CursorMode, CursorModes } from '../types'

export const DesignerSideboard = () => {
  const { cursorMode, setCursorMode } = useDesignerCursor()
  const { terrainType, setTerrainType } = usePaintMode()
  const { objectType, setObjectType } = usePlaceMode()
  const { setOpenDialog } = useDesignerDialogs()
  return (
    <div className='absolute  bottom-16 top-16 w-24 rounded-lg bg-slate-200 bg-opacity-50'>
      <div className='relative h-full w-full overflow-visible'>
        <div className='absoulte bottom-0 left-12 top-0'>
          <SideboardSelectPane
            title='Cursor'
            values={CursorModes}
            selectedValue={cursorMode}
            onValueSelect={newVal => setCursorMode(newVal)}
          />
          <SideboardSelectPane
            title='Palette'
            values={TerrainTypes}
            selectedValue={cursorMode === 'Paint' ? terrainType : null}
            onValueSelect={newVal => setTerrainType(newVal)}
          />
          <SideboardSelectPane
            title='Objects'
            values={ObjectTypes}
            selectedValue={cursorMode === 'Place' ? objectType : null}
            onValueSelect={newVal => setObjectType(newVal)}
          />
          <div className='flex flex-col'>
            <h2 className='text-xl underline'>Map actions</h2>
            <button onClick={() => setOpenDialog('Export')}>Export map</button>
            <button onClick={() => setOpenDialog('Import')}>Import map</button>
          </div>
        </div>
      </div>
    </div>
  )
}

type SelectPaneType = CursorMode | TerrainType | ObjectType
type SideboardSelectPaneProps<TValueType = SelectPaneType> = {
  title: string
  values: readonly TValueType[]
  selectedValue: TValueType | null
  onValueSelect: (value: TValueType) => void
}
function SideboardSelectPane<TValueType>({
  title,
  values,
  selectedValue,
  onValueSelect,
}: SideboardSelectPaneProps<TValueType>) {
  return (
    <div className='flex flex-col'>
      <h2 className='text-xl underline'>{title}</h2>
      {values.map((v, i) => (
        <SideboardButton
          key={i}
          value={v}
          selected={selectedValue === v}
          onClick={() => onValueSelect(v)}
        />
      ))}
    </div>
  )
}

type SideboardButtonProps<TValueType = SelectPaneType> = {
  value: TValueType
  selected: boolean
  onClick: () => void
}
function SideboardButton<TValueType>({
  value,
  selected,
  onClick,
}: SideboardButtonProps<TValueType>) {
  return (
    <button
      onClick={onClick}
      className={selected ? 'bg-green-500' : 'bg-red-500'}
    >
      {value as string}
    </button>
  )
}
