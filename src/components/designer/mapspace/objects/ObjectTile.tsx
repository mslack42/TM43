"use client";
import { ObjectDefinition } from "../../context/DesignerContext";
import { XYCoords } from "../../types";
import { ObjectDisplay } from "./ObjectDisplay";
import { ObjectInteractivity } from "./ObjectInteractivity";

type Props = {
  object?: ObjectDefinition;
  position: XYCoords;
  layerId: string;
};
export const ObjectTile = ({ object, position, layerId }: Props) => {
  return (
    <div className="relative">
      <div style={{ height: 32, width: 32 }}>
        {object && <ObjectDisplay object={object} />}
      </div>
      <div className="absolute top-0 bottom-0 left-0 right-0">
        <ObjectInteractivity coords={position} layerId={layerId} />
      </div>
    </div>
  );
};
