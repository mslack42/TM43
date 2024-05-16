'use client'

import {
  ObjectType,
  ObjectTypes,
  TerrainType,
  TerrainTypes,
} from '@/components/mapspace/types'
import { updateCursorMode } from '@/stores/designer/designerCursorSlice'
import {
  useDesignerDispatch,
  useDesignerSelector,
} from '@/stores/designer/hooks'
import { updatePaintTerrainType } from '@/stores/designer/paintModeSlice'
import { updatePlaceObjectType } from '@/stores/designer/placeModeSlice'
import { useDesignerDialogs } from '../context/dialog/DesignerDialogContext'
import { CursorMode, CursorModes } from '../types'

export const DesignerSideboard = () => {
  const cursorMode = useDesignerSelector(
    state => state.designerCursor.cursorMode,
  )
  const terrainType = useDesignerSelector(
    state => state.paintMode.paintTerrainType,
  )
  const objectType = useDesignerSelector(state => state.placeMode.objectType)
  const dispatch = useDesignerDispatch()

  const { setOpenDialog } = useDesignerDialogs()

  return (
    <div className='absolute  bottom-16 top-16 w-24 rounded-lg bg-slate-200 bg-opacity-50'>
      <div className='relative h-full w-full overflow-visible'>
        <div className='absoulte bottom-0 left-12 top-0'>
          <SideboardSelectPane
            title='Cursor'
            values={CursorModes}
            selectedValue={cursorMode}
            onValueSelect={newVal => dispatch(updateCursorMode(newVal))}
          />
          <SideboardSelectPane
            title='Palette'
            values={TerrainTypes}
            selectedValue={cursorMode === 'Paint' ? terrainType : null}
            onValueSelect={newVal => dispatch(updatePaintTerrainType(newVal))}
          />
          <SideboardSelectPane
            title='Objects'
            values={ObjectTypes}
            selectedValue={cursorMode === 'Place' ? objectType : null}
            onValueSelect={newVal => dispatch(updatePlaceObjectType(newVal))}
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
