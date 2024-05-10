import { PropsWithChildren } from "react";
import { XYLCoords } from "../types";
import { useDesignerCursor } from "../context/DesignerCursorContext";

type Props = {
  cursorTile: XYLCoords;
};
export const CursorTileCapture = ({
  children,
  cursorTile,
}: PropsWithChildren<Props>) => {
  const { setCursorTile } = useDesignerCursor();
  return (
    <div
      className="w-full h-full"
      onPointerMove={() => setCursorTile(cursorTile)}
    >
      {children}
    </div>
  );
};
