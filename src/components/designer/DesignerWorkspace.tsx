"use client";
import { useEffect, useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { DesignerContextProvider } from "./context/DesignerContext";
import { LayerGrid } from "./mapspace/LayerGrid";
import { DesignerSideboard } from "./controls/DesignerSideboard";
import { useDesignerCursor } from "./context/DesignerCursorContext";

export const DesignerWorkspace = () => {
  return (
    <div className="w-full min-h-screen bg-black overflow-hidden relative">
      <DesignerContextProvider>
        <PanZoomWorkspace />
      </DesignerContextProvider>
    </div>
  );
};

function PanZoomWorkspace() {
  const [ready, setReady] = useState(false);
  const [windowDims, setWindowDims] = useState([0, 0]);
  const { cursorMode } = useDesignerCursor();

  useEffect(() => {
    function handleResize() {
      setWindowDims([window.innerWidth, window.innerHeight]);
    }
    handleResize();
    window.addEventListener("resize", handleResize);

    setReady(true);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {ready && (
        <>
          <TransformWrapper
            minScale={1}
            maxScale={10}
            initialScale={1}
            limitToBounds={false}
            initialPositionX={windowDims[0] / 4 - 400}
            initialPositionY={windowDims[1] / 4 - 400}
            smooth
            panning={{ disabled: cursorMode != "Drag" }}
          >
            <TransformComponent
              wrapperStyle={{
                width: windowDims[0],
                height: windowDims[1],
              }}
            >
              <LayerGrid />
            </TransformComponent>
          </TransformWrapper>
          <DesignerSideboard />
        </>
      )}
    </>
  );
}
