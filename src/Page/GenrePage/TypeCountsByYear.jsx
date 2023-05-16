import React from "react";
import FlowerChart from "./FlowerChart";

const TypeCountsByYear = ({ data, paths, genreColorGenerator }) => {
  return (
    <div className="grid grid-cols-[1fr_10fr_1fr] w-full h-[100vh]">
      <div className="col-start-2 h-[10vh]">Legend</div>
      <div className="col-start-2 grid grid-cols-5 grid-rows-5 h-[88vh]">
        {data.map((d, index) => {
          return (
            <FlowerChart
              key={index}
              data={d}
              paths={paths}
              genreColorGenerator={genreColorGenerator}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TypeCountsByYear;
