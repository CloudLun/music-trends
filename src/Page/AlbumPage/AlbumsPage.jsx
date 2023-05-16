import React, { useState } from "react";
import Nav from "./Nav";

import { albums } from "../../Data/AlbumPageData/albums";
import { albumsCountry } from "../../Data/AlbumPageData/albumsFinal.json";

const AlbumsPage = () => {
  const [selectAngle, setSelectAngle] = useState("years");
  const [selectYear, setSelectYear] = useState(2022);
  const [selectGenre, setSelectGenre] = useState("Rock");

  const onAngleChange = (event) => {
    setSelectAngle(event.target.value);
  };
  const onYearChange = (event) => {
    setSelectYear(event.target.value);
  };
  const onGenreChange = (event) => {
    setSelectGenre(event.target.value);
  };

  let filteredAlbums;
  if (selectAngle === "years") {
    filteredAlbums =
      selectYear &&
      albums
        .filter((album) => album.year === parseInt(selectYear))
        .sort((a1, a2) =>
          +a1.rating < +a2.rating ? 1 : +a1.rating > +a2.rating ? -1 : 0
        );
      console.log(albums)
  } else {
    filteredAlbums =
      selectGenre &&
      albums
        .filter(
          (album) =>
            album.genre[0].includes(selectGenre) &&
            album.genre[0] !== "Jazz Rap"
        )
        .sort((a1, a2) =>
          +a1.rating < +a2.rating ? 1 : +a1.rating > +a2.rating ? -1 : 0
        );
  }

  return (
    <div className="flex flex-col w-[100%] h-[100%]">
      <Nav
        selectAngle={selectAngle}
        onAngleChange={onAngleChange}
        onYearChange={onYearChange}
        onGenreChange={onGenreChange}
      />
      <div className="grid grid-cols-10 grid-rows-10 flex-1 pt-[80px] w-[100%] overflow-scroll">
        {filteredAlbums.slice(0, 100).map((album, index) => {
          return (
            <div
              key={index}
              className="relative w-[100%] transition-all duration-500 [transform-style:preserve-3d] hover:[transform:rotateY(180deg)] cursor-pointer "
            >
              <div className="">
                <img src={album.cover} alt="" className="w-full h-[152px]" />
              </div>
              <div className="absolute inset-0 flex flex-col justify-between px-[10px] py-[10px] h-[152px] bg-black/80  text-white [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <div className="text-[12px] font-bold tracking-[0.5px]">
                  {album.album}
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-[12px] font-bold">{album.artist}</div>
                    <div className="text-[10px] font-normal">
                      {album.subgenre[0]}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] font-bold">
                      {album.rating}
                    </div>
                  </div>
                </div>
                <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[40px] font-normal opacity-[0.5]">
                  {index + 1}
                </div>
                {/* <div>
                  <div className="flex justify-between items-center">
                    <div className="text-[10px] font-medium">Ranking</div>

                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-[10px] font-medium">Ratings</div>
                    <div className="text-[10px] font-normal">
                      {album.rating}
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlbumsPage;
