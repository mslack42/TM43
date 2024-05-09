"use client";
import { useDesigner } from "./DesignerContext";

export const TileGrid = () => {
  const { mapDefinition } = useDesigner();

  return (
    <div className="flex flex-row gap-10">
      {mapDefinition.layers.map((l, i) => (
        <div key={i} className="bg-white">
          <div className="w-full">{l.gridId}</div>
          <div className="flex flex-col">
            {l.grid.map((r, j) => (
              <div key={j} className="flex flex-row">
                {r.map((c, k) => (
                  <div key={k} style={{ height: 32, width: 32 }}>
                    {c.terrainType[0]}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
