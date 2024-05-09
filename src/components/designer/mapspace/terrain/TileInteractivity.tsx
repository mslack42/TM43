"use client";
import { CursorTileCapture } from "../../common/CursorTileCapture";
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
    <CursorTileCapture cursorTile={[...props.tileCoords, props.layerId]}>
      {cursorMode === "Paint" ? (
        <PaintMode />
      ) : (
        <div className="w-full h-full"></div>
      )}
    </CursorTileCapture>
  );
};

const PaintMode = () => {
  const { paintTile, isBrushDown, setIsBrushDown } = usePaintMode();
  return (
    <div
      className="w-full h-full "
      onPointerDown={() => {
        setIsBrushDown(true);
        paintTile();
      }}
      onPointerUp={() => {
        setIsBrushDown(false);
      }}
      onPointerMove={() => {
        if (isBrushDown) {
          paintTile();
        }
      }}
      onPointerEnter={() => {
        if (isBrushDown) {
          paintTile();
        }
      }}
      onPointerLeave={() => {
        if (isBrushDown) {
          paintTile();
        }
      }}
    ></div>
  );
};
