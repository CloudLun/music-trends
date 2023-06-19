import React, { useState } from "react";

import ScatterPlot from "./ScatterPlot";
import Category from "../Shared/Category";
import GenreSelection from "../Shared/GenreSelection";

const RatingPage = ({
  genrePageHandler,
  countriesPageHandler,
  ratingsPageHandler,
  genreColorGenerator,
}) => {
  const genreChangeHandler = (event) => {
    setGenre(event.target.value);
  };

  const [genre, setGenre] = useState("All");
  const [toggle, setToggle] = useState(false);

  const toggleHandler = () => {
    setToggle(!toggle);
    console.log(toggle);
  };

  return (
    <div className="flex w-full h-full bg-[#242424]">
      <div className="px-[40px] w-[25%] h-full">
        <div className="pt-[60px] w-full h-[18%]">
          <Category
            page="ratings"
            genrePageHandler={genrePageHandler}
            countriesPageHandler={countriesPageHandler}
            ratingsPageHandler={ratingsPageHandler}
          />
          <p className="mt-[45px] text-[30px] font-bold tracking-[1.5px] leading-[1.2]">
            Average Rating is Going Down
          </p>
          <p className="mt-[20px] w-[289.25px] text-[12px] text-[#e5e5e5]">
            Each dots represents a album. Please hover hover to see the album
            information.
          </p>
        </div>
        <div className="pt-[150px] h-[82%]">
          <div className="mb-[60px]">
            <div className="flex items-center gap-[10px] mb-[5px]">
              <div
                className="w-[15px] h-[15px] rounded-full"
                style={{
                  backgroundColor:
                    genre === "All" ? "#f2f2f2" : genreColorGenerator(genre),
                }}
              ></div>
              <GenreSelection genreChangeHandler={genreChangeHandler} />
              <h1>Albums</h1>
            </div>
            <div className="flex gap-[10px] items-center">
              <div
                className={`flex ${
                  toggle ? "justify-end" : "justify-start"
                } items-center my-[5px] w-[48px] h-[24px] bg-[#f2f2f2] rounded-[360px] cursor-pointer`}
                onClick={toggleHandler}
              >
                <div className="block w-[22px] h-[22px] rounded-full bg-[#bfbfbf]"></div>
              </div>
              <div>Average Ratings</div>
            </div>
          </div>
          <p className="w-[289.25px] leading-[1.5] text-[#e5e5e5]">
            Regarding the quality of music, Most of the top 100 albums gathered
            ratings between 3.68 to 4.0 every year. However, there are more
            albums in the recent-year list which ratings down to 3.5, and also
            fewer albums with ratings up to 4.1. Also, the trend of the average
            rating of the top 100 list is going down.
            <br />
            <br />
            Does it mean that the qualities of new albums are worse compared to
            the early age? Or maybe nowadays music listeners are more strict
            about album quality because they have more resources to get access
            to music than before. It may have plenty of factors affecting this
            trend.
          </p>
        </div>
      </div>
      <div className="flex-1 pl-[40px] pr-[0px]  h-full">
        <div className="pl-[20px] w-full">
          <div className="mt-[55px] text-[18px] font-bold tracking-[1.5px]"></div>
        </div>
        <div className="w-full h-[94%] text-[#e5e5e5]">
          <ScatterPlot
            genre={genre}
            genreColorGenerator={genreColorGenerator}
            toggle={toggle}
          />
        </div>
      </div>
    </div>
  );
};

export default RatingPage;
