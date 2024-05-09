import { PropsWithChildren } from "react";
import { useDesigner } from "../context/DesignerContext";
import { XYLCoords } from "../types";

type Props = {
  cursorTile: XYLCoords;
};
export const CursorTileCapture = ({
  children,
  cursorTile,
}: PropsWithChildren<Props>) => {
  const { setCursorTile } = useDesigner();
  return (
    <div
      className="w-full h-full"
      onPointerMove={() => setCursorTile(cursorTile)}
    >
      {children}
    </div>
  );
};
