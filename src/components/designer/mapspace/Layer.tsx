"use client";
import { Fragment } from "react";
import {
  GridDefinition,
  ObjectDefinition,
  useDesigner,
} from "../context/DesignerContext";
import { ObjectTile } from "./objects/ObjectTile";
import { TerrainTile } from "./terrain/TerrainTile";

export const Layer = ({ layer }: { layer: GridDefinition }) => {
  const { mapDefinition, cursorMode, setCursorTile } = useDesigner();

  const objects: (ObjectDefinition | null)[][] = layer.grid.map((r) =>
    r.map((c) => null)
  );
  mapDefinition.objects
    .filter((ob) => ob.position[2] === layer.gridId)
    .forEach((ob) => {
      objects[ob.position[1]][ob.position[0]] = ob;
    });

  return (
    <div className="bg-white">
      <div className="w-full">{layer.gridId}</div>
      <div className="relative" onPointerLeave={() => setCursorTile(null)}>
        <div
          className={
            "flex flex-col " +
            (cursorMode !== "Paint" ? " pointer-events-none" : "")
          }
        >
          {layer.grid.map((r, j) => (
            <div key={j} className="flex flex-row">
              {r.map((c, k) => (
                <Fragment key={k}>
                  <TerrainTile tileDef={c} position={[k, j, layer.gridId]} />
                </Fragment>
              ))}
            </div>
          ))}
        </div>
        <div
          className={
            "absolute top-0 left-0 " +
            (cursorMode !== "Place" && cursorMode !== "Select"
              ? " pointer-events-none"
              : "")
          }
        >
          {objects.map((r, j) => (
            <div key={j} className="flex flex-row">
              {r.map((c, k) => (
                <Fragment key={k}>
                  <ObjectTile
                    object={c ?? undefined}
                    position={[k, j, layer.gridId]}
                  />
                </Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
