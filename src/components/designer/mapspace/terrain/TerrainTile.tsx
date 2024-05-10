"use client";
import { GridTileDefinition } from "../../context/DesignerContext";
import { XYLCoords } from "../../types";
import { GridLines } from "./GridLines";
import { TileDisplay } from "./TileDisplay";
import { TileInteractivity } from "./TileInteractivity";

export const TerrainTile = ({
  tileDef,
  position,
}: {
  tileDef: GridTileDefinition;
  position: XYLCoords;
}) => {
  return (
    <div className="relative">
      <div style={{ height: 32, width: 32 }}>
        <TileDisplay terrain={tileDef.terrainType} />
      </div>
      <GridLines />
      <div className="absolute top-0 bottom-0 left-0 right-0">
        <TileInteractivity position={position} />
      </div>
    </div>
  );
};
