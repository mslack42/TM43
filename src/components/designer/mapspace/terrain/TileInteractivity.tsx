"use client";
import { useDesigner } from "../../context/DesignerContext";
import { usePaintMode } from "../../context/PaintModeContext";
import { XYCoords } from "../../types";

type Props = {
  tileCoords: XYCoords;
  layerId: string;
};

export const TileInteractivity = (props: Props) => {
  const { cursorMode } = useDesigner();
  return (
    <>
      {cursorMode === "Paint" ? (
        <PaintMode {...props} />
      ) : (
        <div className="w-full h-full"></div>
      )}
    </>
  );
};

const PaintMode = ({ tileCoords, layerId }: Props) => {
  const { paintTile, isBrushDown, setIsBrushDown } = usePaintMode();
  return (
    <div
      className="w-full h-full "
      onPointerDown={() => {
        setIsBrushDown(true);
        paintTile(layerId, tileCoords);
      }}
      onPointerUp={() => {
        setIsBrushDown(false);
      }}
      onPointerMove={() => {
        if (isBrushDown) {
          paintTile(layerId, tileCoords);
        }
      }}
      onPointerEnter={() => {
        if (isBrushDown) {
          paintTile(layerId, tileCoords);
        }
      }}
      onPointerLeave={() => {
        if (isBrushDown) {
          paintTile(layerId, tileCoords);
        }
      }}
    ></div>
  );
};
