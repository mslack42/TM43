"use client";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { defaultMapDefintion } from "./defaultMapDefintion";

type XCoord = number;
type YCoord = number;
type XYCoords = [XCoord, YCoord];

export const CursorModes = ["Drag", "Paint", "Place"] as const;
export type CursorMode = (typeof CursorModes)[number];
export const TerrainTypes = ["Ground", "Ice", "Rock"] as const;
export type TerrainType = (typeof TerrainTypes)[number];
export const ObjectTypes = ["Player", "Goal"] as const;
export type ObjectType = (typeof ObjectTypes)[number];

export type MapDefinition = {
  objects: ObjectDefinition[];
  layers: GridDefinition[];
};
type GridDefinition = {
  grid: GridTileDefinition[][];
  gridId: string;
};

type GridTileDefinition = {
  terrainType: TerrainType;
};

type ObjectDefinition = {
  objectType: ObjectType;
  position: XYCoords;
  gridId: string;
};

type DesignerContextData = {
  cursorMode: CursorMode;
  setCursorMode: (newMode: CursorMode) => void;
  terrainType: TerrainType;
  setTerrainType: (newTerrain: TerrainType) => void;
  objectType: ObjectType;
  setObjectType: (newObject: ObjectType) => void;
  mapDefinition: MapDefinition;
};

const DesignerContext = createContext<DesignerContextData>({
  cursorMode: "Drag",
  setCursorMode: function (_newMode: CursorMode): void {
    throw new Error("Function not implemented.");
  },
  terrainType: "Ice",
  setTerrainType: function (_newTerrain: TerrainType): void {
    throw new Error("Function not implemented.");
  },
  objectType: "Player",
  setObjectType: function (_newObject: ObjectType): void {
    throw new Error("Function not implemented.");
  },
  mapDefinition: {
    objects: [],
    layers: [],
  },
});

export const useDesigner = () => useContext(DesignerContext);

export function DesignerContextProvider({ children }: PropsWithChildren) {
  const [mapDefinition, setMapDefinition] =
    useState<MapDefinition>(defaultMapDefintion);
  const [cursorMode, setCursorMode] = useState<CursorMode>("Drag");
  const [terrainType, setTerrainType] = useState<TerrainType>("Ice");
  const [objectType, setObjectType] = useState<ObjectType>("Player");
  const value: DesignerContextData = {
    cursorMode,
    setCursorMode,
    terrainType,
    setTerrainType,
    objectType,
    setObjectType,
    mapDefinition,
  };

  return (
    <DesignerContext.Provider value={value}>
      {children}
    </DesignerContext.Provider>
  );
}
