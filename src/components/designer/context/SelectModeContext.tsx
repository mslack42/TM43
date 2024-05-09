"use client";
import { createContext, useContext, PropsWithChildren, useState } from "react";
import { ObjectType, XYCoords } from "../types";
import {
  MapDefinition,
  ObjectDefinition,
  useDesigner,
} from "./DesignerContext";

type SelectModeContextData = {
  selectedObject: ObjectDefinition | null;
  selectObject: (coords: XYCoords, gridId: string) => void;
  deselectObject: (coords: XYCoords, gridId: string) => void;
  unselectObject: () => void;
};

const SelectModeContext = createContext<SelectModeContextData>({
  selectedObject: null,
  selectObject: function (coords: XYCoords, gridId: string): void {
    throw new Error("Function not implemented.");
  },
  deselectObject: function (coords: XYCoords, gridId: string): void {
    throw new Error("Function not implemented.");
  },
  unselectObject: function (): void {
    throw new Error("Function not implemented.");
  },
});

export const useSelectMode = () => useContext(SelectModeContext);

export const SelectModeContextProvider = ({ children }: PropsWithChildren) => {
  const [selectedObject, setSelectedObject] = useState<ObjectDefinition | null>(
    null
  );
  const { mapDefinition, setMapDefinition } = useDesigner();

  const selectObject = (coords: XYCoords, gridId: string) => {
    if (selectedObject) {
      return;
    }
    const matchedObjects = mapDefinition.objects.filter(
      (obj) =>
        obj.position[0] === coords[0] &&
        obj.position[1] === coords[1] &&
        obj.gridId === gridId
    );
    if (matchedObjects.length === 0) {
      return;
    }
    const matched = matchedObjects[0];
    setSelectedObject(matched);
    setMapDefinition({
      ...mapDefinition,
      objects: [...mapDefinition.objects].filter(
        (obj) =>
          !(
            obj.gridId === matched.gridId &&
            obj.position[0] === matched.position[0] &&
            obj.position[1] === matched.position[1]
          )
      ),
    });
  };

  const deselectObject = (coords: XYCoords, gridId: string) => {
    if (!selectedObject) {
      return;
    }
    setMapDefinition({
      ...mapDefinition,
      objects: [
        ...mapDefinition.objects,
        {
          ...selectedObject,
          position: coords,
          gridId,
        },
      ],
    });
    setSelectedObject(null);
  };

  const unselectObject = () => {
    if (!selectedObject) {
      return;
    }
    setMapDefinition({
      ...mapDefinition,
      objects: [
        ...mapDefinition.objects,
        {
          ...selectedObject,
        },
      ],
    });
    setSelectedObject(null);
  };

  const value: SelectModeContextData = {
    selectedObject,
    selectObject,
    deselectObject,
    unselectObject,
  };

  return (
    <SelectModeContext.Provider value={value}>
      {children}
    </SelectModeContext.Provider>
  );
};
