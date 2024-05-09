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
  placeObject: (coords: XYCoords, gridId: string) => void;
  selectedObject: ObjectDefinition | null;
  selectObject: (obj: ObjectDefinition) => void;
};

const PlaceModeContext = createContext<PlaceModeContextData>({
  objectType: "Player",
  setObjectType: function (_newObject: ObjectType): void {
    throw new Error("Function not implemented.");
  },
  placeObject: function (_coords: XYCoords): void {
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
  const { mapDefinition, setMapDefinition } = useDesigner();

  const placeObject = (coords: XYCoords, gridId: string) => {
    console.log("placing");
    const newMapDef: MapDefinition = {
      ...mapDefinition,
      objects: [
        ...mapDefinition.objects,
        {
          gridId,
          position: coords,
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
