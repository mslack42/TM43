"use client";
import { useDesigner } from "../../context/DesignerContext";
import { usePlaceMode } from "../../context/PlaceModeContext";
import { useSelectMode } from "../../context/SelectModeContext";
import { XYCoords } from "../../types";

type Props = { coords: XYCoords; layerId: string };
export const ObjectInteractivity = (props: Props) => {
  const { cursorMode } = useDesigner();
  return (
    <>
      {cursorMode === "Place" ? (
        <PlaceMode {...props} />
      ) : cursorMode === "Select" ? (
        <SelectMode {...props} />
      ) : (
        <div className="w-full h-full"></div>
      )}
    </>
  );
};

const PlaceMode = ({ coords, layerId }: Props) => {
  const { placeObject } = usePlaceMode();
  return (
    <div
      className="w-full h-full "
      onPointerDown={() => {
        placeObject(coords, layerId);
      }}
    ></div>
  );
};

const SelectMode = ({ coords, layerId }: Props) => {
  const { selectObject, deselectObject } = useSelectMode();
  return (
    <div
      className="w-full h-full "
      onPointerDown={() => {
        selectObject(coords, layerId);
      }}
      onPointerUp={() => {
        deselectObject(coords, layerId);
      }}
    ></div>
  );
};
