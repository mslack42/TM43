"use client";
type XCoord = number;
type YCoord = number;
export type XYCoords = [XCoord, YCoord];
type LayerId = string;
export type XYLCoords = [XCoord, YCoord, LayerId];

export const CursorModes = ["Drag", "Paint", "Place", "Select"] as const;
export type CursorMode = (typeof CursorModes)[number];
export const TerrainTypes = ["Ground", "Ice", "Rock"] as const;
export type TerrainType = (typeof TerrainTypes)[number];
export const ObjectTypes = ["Player", "Goal"] as const;
export type ObjectType = (typeof ObjectTypes)[number];
