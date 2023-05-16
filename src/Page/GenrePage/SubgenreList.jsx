import React from "react";

import ScatterPlot from "../RatingPage/ScatterPlot";
import CircleChart from "./GenreNav";

const SubgenreList = ({ genres, subgenres, genreColorGenerator }) => {
  return (
    <>
      <div className="py-[30px] m-auto text-[18px] tracking-[1.25px]">
        GENRES OVER TWENTY YEARS
      </div>
      <div className="grid grid-cols-[40px_1fr_4fr_1fr_40px] flex-1 gap-[20px] mb-[5px] ">
        {/* <div className="grid col-start-3 h-[90vh] text-[12px]">
          <div className="grid grid-cols-5 gap-[10px] mb-[5px] h-[10vh]">
            {genres.map((genre, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center justify-start gap-[5px]"
                >
                  <div
                    data-index={index}
                    className={`block w-[6px] h-[6px] rounded-[50%] bg-[${genreColorGenerator(
                      genre
                    )}] opacity-[70%]`}
                  ></div>
                  <div className={`py-[5px]`}>{genre}</div>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-2 h-[80vh] overflow-scroll">
            {subgenres.map((subgenre, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center justify-start gap-[6px]"
                >
                  <div
                    data-index={index}
                    className={`block w-[6px] h-[6px] rounded-[50%] bg-[${genreColorGenerator(
                      subgenre[0]
                    )}] opacity-[70%]`}
                  ></div>
                  <div data-index={index}>{subgenre[1]}</div>
                </div>
              );
            })}
          </div>
        </div> */}
        <div className="col-start-3 h-[90vh]">
          {/* <ScatterPlot genreColorGenerator ={genreColorGenerator} /> */}
          <CircleChart genreColorGenerator={genreColorGenerator} />
        </div>
      </div>
    </>
  );
};

export default SubgenreList;
