"use client";
import { ObjectDefinition } from "../../context/DesignerContext";

export const ObjectDisplay = ({ object }: { object: ObjectDefinition }) => {
  const getTempContents = (object: ObjectDefinition) => {
    switch (object.objectType) {
      case "Player": {
        return "P";
      }
      case "Goal": {
        return "G";
      }
      default: {
        return "err";
      }
    }
  };
  return (
    <div className="w-full h-full text-center align-middle bg-slate-500 bg-opacity-50 rounded-xl">
      {getTempContents(object)}
    </div>
  );
};
