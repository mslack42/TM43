"use client";
export const GridLines = () => {
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0">
      <div className="relative w-full h-full">
        <div
          className="absolute opacity-50 bg-red-600 left-0 top-0 bottom-0"
          style={{ width: 1 }}
        ></div>
        <div
          className="absolute opacity-50 bg-red-600 top-0 left-0 right-0"
          style={{ height: 1 }}
        ></div>
      </div>
    </div>
  );
};
