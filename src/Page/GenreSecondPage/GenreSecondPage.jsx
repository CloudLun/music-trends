import React, { useState } from "react";
import * as d3 from "d3";

import RadarChart from "./RadarChart";
import Category from "../Shared/Category";
import GenreSelection from "../Shared/GenreSelection";
import WaveChart from "./WaveChart";

const genreColorGenerator = (genre) => {
  return genre === "Metal"
    ? "#cccccc"
    : genre === "Rock"
    ? "#FF9B06"
    : genre === "Pop"
    ? "#F15BB5"
    : genre === "Folk"
    ? "#B2C381"
    : genre === "Hip-Hop"
    ? "#FF4E2C"
    : genre === "Jazz"
    ? "#76A896"
    : genre === "Electronic"
    ? "#FEE440"
    : genre === "Ambient"
    ? "#75BED7"
    : genre === "RnB"
    ? "#8984C9"
    : "#A47993";
};
const years = [
  2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012,
  2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
];

const genrePageHandler = () => {
  window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
};

const countriesPageHandler = () => {
  window.scrollTo({ top: window.innerHeight * 3, behavior: "smooth" });
};

const ratingsPageHandler = () => {
  window.scrollTo({ top: window.innerHeight * 4, behavior: "smooth" });
};

const GenreSecondPage = () => {
  const [year, setYear] = useState(22);
  const [play, setPlay] = useState(false);
  const [genre, setGenre] = useState("All");

  const onPlayChange = () => {
    return setPlay(true);
  };

  const onPlayStop = () => {
    return setPlay(false);
  };

  const genreChangeHandler = (event) => {
    setGenre(event.target.value);
  };

  // const onYearChange = (event) => {
  //   console.log(years.indexOf(+event.target.value));
  //   setYear(years.indexOf(+event.target.value));
  // };

  return (
    <div className="flex w-[100vw] h-[100vh] bg-[#242424]">
      <div className="relative px-[40px] w-[25%] h-full">
        <div className="pt-[60px] w-full h-[18%]">
          <Category
            page="genre"
            genrePageHandler={genrePageHandler}
            countriesPageHandler={countriesPageHandler}
            ratingsPageHandler={ratingsPageHandler}
          />
          <p className="mt-[45px] text-[30px] font-bold tracking-[1.5px]">
            <span className="px-[5px] py-[2px] bg-[#FF4E2C]">Hip Hop</span> is
            Growing
          </p>
          <p className="mt-[20px] w-[289.25px] text-[12px] text-[#e5e5e5]">
            Click play button to see the genre trend these years
          </p>
        </div>

        <div className="pt-[90px] h-[82%]">
          <div
            className="absolute top-[54px] left-[calc(100%+40px)] flex items-center gap-[7.5px] mb-[10px] px-[12px] py-[4px] bg-[#525252] rounded-[15px] cursor-pointer hover:translate-y-[-3px] hover:shadow-sm hover:shadow-[#7e7e7e]"
            onClick={onPlayChange}
          >
            <div className=" text-[16px]">PLAY</div>
            <div className="w-[10px] h-[10px] border-t-2 border-r-2 rotate-45"></div>
          </div>
          {/* <div
            className="absolute top-[54px] left-[calc(100%+135px)] flex items-center mb-[10px] px-[12px] py-[4px] bg-[#525252] rounded-[15px] cursor-pointer hover:translate-y-[-3px] hover:shadow-sm hover:shadow-[#7e7e7e]"
            onClick={onPlayStop}
          >
            <div className=" text-[16px]">STOP</div>
            <div className="ml-[7.5px] mr-[5px] w-[2px] h-[12px] bg-white"></div>
            <div className="w-[2px] h-[12px] bg-white"></div>
          </div> */}
          {/* <div className="absolute top-[115px] left-[calc(100%+44px)] mb-[60px] font-bold text-[32px]">2000</div> */}
          <div className="flex items-center gap-[10px] mb-[5px]">
            <div
              className="w-[24px] h-[5px]"
              style={{
                backgroundColor:
                  genre === "All" ? "#f2f2f2" : genreColorGenerator(genre),
              }}
            ></div>
            <h1>Album Counts</h1>
          </div>
          <div className="mb-[60px]">
            <GenreSelection genreChangeHandler={genreChangeHandler} />
          </div>
          <p className="w-[289.25px] leading-[1.5] text-[#e5e5e5]">
            The 90's scene in which Alt Rock and Grunge is dominant in the music
            world is changing after the post-millennium era. Instead, Rapping
            becomes viral throughout the world in recent years. More and more
            artists devote their creativity to this field. The number of hip-hop
            albums in the top 100 lists was constantly increasing, even over
            metal and rock albums.
          </p>
          <div className="absolute bottom-[20px] w-full h-[250px]">
          <h1>Genre Distribution</h1>
            <WaveChart type={genre} />
          </div>
        </div>
      </div>
      <div className="flex-1 px-[40px] h-full">
        <RadarChart year={year} play={play} genre={genre} />
      </div>
      {/* <div className="border-2 grid grid-cols-5 grid-rows-5 ml-[60px] flex-1 h-full">
        {years.map((y, i) => {
          return (
            <div key={i} className="border-2">
              <RadarChart year={y} />
            </div>
          );
        })}
      </div> */}
    </div>
  );
};

export default GenreSecondPage;
