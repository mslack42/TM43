"use client";
import { createContext, useContext, PropsWithChildren, useState } from "react";
import { defaultMapDefintion } from "./defaultMapDefintion";
import { TerrainType, ObjectType, CursorMode, XYLCoords } from "../types";
import { PaintModeContextProvider } from "./PaintModeContext";
import { PlaceModeContextProvider } from "./PlaceModeContext";
import { SelectModeContextProvider } from "./SelectModeContext";

export type MapDefinition = {
  objects: ObjectDefinition[];
  layers: GridDefinition[];
};
export type GridDefinition = {
  grid: GridTileDefinition[][];
  gridId: string;
};

export type GridTileDefinition = {
  terrainType: TerrainType;
};

export type ObjectDefinition = {
  objectType: ObjectType;
  position: XYLCoords;
};

export type DesignerContextData = {
  cursorMode: CursorMode;
  setCursorMode: (newMode: CursorMode) => void;
  cursorTile: XYLCoords | null;
  setCursorTile: (t: XYLCoords | null) => void;
  mapDefinition: MapDefinition;
  setMapDefinition: (newDef: MapDefinition) => void;
};

export const DesignerContext = createContext<DesignerContextData>({
  cursorMode: "Drag",
  setCursorMode: function (_newMode: CursorMode): void {
    throw new Error("Function not implemented.");
  },
  mapDefinition: {
    objects: [],
    layers: [],
  },
  setMapDefinition: function (_newDef: MapDefinition): void {
    throw new Error("Function not implemented.");
  },
  cursorTile: null,
  setCursorTile: function (_t: XYLCoords | null): void {
    throw new Error("Function not implemented.");
  },
});

export const useDesigner = () => useContext(DesignerContext);

export function DesignerContextProvider({ children }: PropsWithChildren) {
  const [mapDefinition, setMapDefinition] =
    useState<MapDefinition>(defaultMapDefintion);
  const [cursorMode, setCursorMode] = useState<CursorMode>("Drag");
  const [cursorTile, _setCursorTile] = useState<XYLCoords | null>(null);
  const setCursorTile = (val: XYLCoords | null) => {
    _setCursorTile(val);
  };

  const value: DesignerContextData = {
    cursorMode,
    setCursorMode,
    mapDefinition,
    setMapDefinition,
    cursorTile,
    setCursorTile,
  };

  return (
    <DesignerContext.Provider value={value}>
      <SelectModeContextProvider>
        <PlaceModeContextProvider>
          <PaintModeContextProvider>{children}</PaintModeContextProvider>
        </PlaceModeContextProvider>
      </SelectModeContextProvider>
    </DesignerContext.Provider>
  );
}
