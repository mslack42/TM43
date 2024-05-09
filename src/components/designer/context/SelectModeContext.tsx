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
  selectObject: () => void;
  deselectObject: () => void;
  unselectObject: () => void;
};

const SelectModeContext = createContext<SelectModeContextData>({
  selectedObject: null,
  selectObject: function (): void {
    throw new Error("Function not implemented.");
  },
  deselectObject: function (): void {
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
  const { mapDefinition, setMapDefinition, cursorTile } = useDesigner();

  const selectObject = () => {
    if (selectedObject || !cursorTile) {
      return;
    }
    const matchedObjects = mapDefinition.objects.filter(
      (obj) =>
        obj.position[0] === cursorTile[0] &&
        obj.position[1] === cursorTile[1] &&
        obj.gridId === cursorTile[2]
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

  const deselectObject = () => {
    if (!selectedObject || !cursorTile) {
      return;
    }
    setMapDefinition({
      ...mapDefinition,
      objects: [
        ...mapDefinition.objects,
        {
          ...selectedObject,
          position: [cursorTile[0], cursorTile[1]],
          gridId: cursorTile[2],
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
