"use client";

import { useDesigner } from "../context/DesignerContext";
import { usePaintMode } from "../context/PaintModeContext";
import { usePlaceMode } from "../context/PlaceModeContext";
import {
  CursorMode,
  CursorModes,
  ObjectType,
  ObjectTypes,
  TerrainType,
  TerrainTypes,
} from "../types";

export const DesignerSideboard = () => {
  const { cursorMode, setCursorMode } = useDesigner();
  const { terrainType, setTerrainType } = usePaintMode();
  const { objectType, setObjectType } = usePlaceMode();
  return (
    <div className="absolute  top-16 bottom-16 rounded-lg w-24 bg-slate-200 bg-opacity-50">
      <div className="relative w-full h-full overflow-visible">
        <div className="absoulte left-12 top-0 bottom-0">
          <SideboardPane
            title="Cursor"
            values={CursorModes}
            selectedValue={cursorMode}
            onValueSelect={(newVal) => setCursorMode(newVal)}
          />
          <SideboardPane
            title="Palette"
            values={TerrainTypes}
            selectedValue={cursorMode === "Paint" ? terrainType : null}
            onValueSelect={(newVal) => setTerrainType(newVal)}
          />
          <SideboardPane
            title="Objects"
            values={ObjectTypes}
            selectedValue={cursorMode === "Place" ? objectType : null}
            onValueSelect={(newVal) => setObjectType(newVal)}
          />
        </div>
      </div>
    </div>
  );
};

type PaneType = CursorMode | TerrainType | ObjectType;
type SideboardPaneProps<TValueType = PaneType> = {
  title: string;
  values: readonly TValueType[];
  selectedValue: TValueType | null;
  onValueSelect: (value: TValueType) => void;
};
function SideboardPane<TValueType>({
  title,
  values,
  selectedValue,
  onValueSelect,
}: SideboardPaneProps<TValueType>) {
  return (
    <div className="flex flex-col">
      <h2 className="text-xl underline">{title}</h2>
      {values.map((v, i) => (
        <SideboardButton
          key={i}
          value={v}
          selected={selectedValue === v}
          onClick={() => onValueSelect(v)}
        />
      ))}
    </div>
  );
}

type SideboardButtonProps<TValueType = PaneType> = {
  value: TValueType;
  selected: boolean;
  onClick: () => void;
};
function SideboardButton<TValueType>({
  value,
  selected,
  onClick,
}: SideboardButtonProps<TValueType>) {
  return (
    <button
      onClick={onClick}
      className={selected ? "bg-green-500" : "bg-red-500"}
    >
      {value as string}
    </button>
  );
}
