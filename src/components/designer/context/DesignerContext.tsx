"use client";
import { createContext, useContext, PropsWithChildren, useState } from "react";
import { defaultMapDefintion } from "./defaultMapDefintion";
import { TerrainType, ObjectType, XYLCoords } from "../types";
import { PaintModeContextProvider } from "./PaintModeContext";
import { PlaceModeContextProvider } from "./PlaceModeContext";
import { SelectModeContextProvider } from "./SelectModeContext";
import { DesignerCursorContextProvider } from "./DesignerCursorContext";

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
  mapDefinition: MapDefinition;
  setMapDefinition: (newDef: MapDefinition) => void;
};

export const DesignerContext = createContext<DesignerContextData>({
  mapDefinition: {
    objects: [],
    layers: [],
  },
  setMapDefinition: function (_newDef: MapDefinition): void {
    throw new Error("Function not implemented.");
  },
});

export const useDesigner = () => useContext(DesignerContext);

export function DesignerContextProvider({ children }: PropsWithChildren) {
  const [mapDefinition, setMapDefinition] =
    useState<MapDefinition>(defaultMapDefintion);

  const value: DesignerContextData = {
    mapDefinition,
    setMapDefinition,
  };

  return (
    <DesignerContext.Provider value={value}>
      <DesignerCursorContextProvider>
        <SelectModeContextProvider>
          <PlaceModeContextProvider>
            <PaintModeContextProvider>{children}</PaintModeContextProvider>
          </PlaceModeContextProvider>
        </SelectModeContextProvider>
      </DesignerCursorContextProvider>
    </DesignerContext.Provider>
  );
}
