"use client";
import { CursorTileCapture } from "../../common/CursorTileCapture";
import { useDesignerCursor } from "../../context/DesignerCursorContext";
import { usePlaceMode } from "../../context/PlaceModeContext";
import { useSelectMode } from "../../context/SelectModeContext";
import { XYLCoords } from "../../types";

type Props = { position: XYLCoords };
export const ObjectInteractivity = ({ position }: Props) => {
  const { cursorMode } = useDesignerCursor();
  return (
    <CursorTileCapture cursorTile={position}>
      {cursorMode === "Place" ? (
        <PlaceMode />
      ) : cursorMode === "Select" ? (
        <SelectMode />
      ) : (
        <></>
      )}
    </CursorTileCapture>
  );
};

const PlaceMode = () => {
  const { placeObject } = usePlaceMode();
  return (
    <div
      className="w-full h-full "
      onPointerDown={() => {
        placeObject();
      }}
    ></div>
  );
};

const SelectMode = () => {
  const { selectObject, deselectObject } = useSelectMode();
  return (
    <div
      className="w-full h-full "
      onPointerDown={() => {
        selectObject();
      }}
      onPointerUp={() => {
        deselectObject();
      }}
    ></div>
  );
};
