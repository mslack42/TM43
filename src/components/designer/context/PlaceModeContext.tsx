"use client";
import { createContext, useContext, PropsWithChildren, useState } from "react";
import { ObjectType, XYCoords } from "../types";
import {
  MapDefinition,
  ObjectDefinition,
  useDesigner,
} from "./DesignerContext";

type PlaceModeContextData = {
  objectType: ObjectType;
  setObjectType: (newObject: ObjectType) => void;
  placeObject: () => void;
  selectedObject: ObjectDefinition | null;
  selectObject: (obj: ObjectDefinition) => void;
};

const PlaceModeContext = createContext<PlaceModeContextData>({
  objectType: "Player",
  setObjectType: function (_newObject: ObjectType): void {
    throw new Error("Function not implemented.");
  },
  placeObject: function (): void {
    throw new Error("Function not implemented.");
  },
  selectedObject: null,
  selectObject: function (obj: ObjectDefinition): void {
    throw new Error("Function not implemented.");
  },
});

export const usePlaceMode = () => useContext(PlaceModeContext);

export const PlaceModeContextProvider = ({ children }: PropsWithChildren) => {
  const [objectType, setObjectType] = useState<ObjectType>("Player");
  const [selectedObject, setSelectedObject] = useState<ObjectDefinition | null>(
    null
  );
  const { mapDefinition, setMapDefinition, cursorTile } = useDesigner();

  const placeObject = () => {
    if (!cursorTile) {
      return;
    }
    const newMapDef: MapDefinition = {
      ...mapDefinition,
      objects: [
        ...mapDefinition.objects,
        {
          gridId: cursorTile[2],
          position: [cursorTile[0], cursorTile[1]],
          objectType,
        },
      ],
    };
    setMapDefinition(newMapDef);
  };

  const selectObject = (obj: ObjectDefinition) => {
    setSelectedObject(obj);
  };

  const value: PlaceModeContextData = {
    objectType,
    setObjectType,
    placeObject,
    selectedObject,
    selectObject,
  };

  return (
    <PlaceModeContext.Provider value={value}>
      {children}
    </PlaceModeContext.Provider>
  );
};
