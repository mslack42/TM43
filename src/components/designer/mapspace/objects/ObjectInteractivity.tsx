"use client";
import { CursorTileCapture } from "../../common/CursorTileCapture";
import { useDesigner } from "../../context/DesignerContext";
import { usePlaceMode } from "../../context/PlaceModeContext";
import { useSelectMode } from "../../context/SelectModeContext";
import { XYCoords } from "../../types";

type Props = { coords: XYCoords; layerId: string };
export const ObjectInteractivity = (props: Props) => {
  const { cursorMode } = useDesigner();
  return (
    <CursorTileCapture cursorTile={[...props.coords, props.layerId]}>
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
