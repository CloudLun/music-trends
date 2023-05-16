import React from "react";
import * as d3 from "d3";

import { albums } from "../../Data/AlbumPageData/albums";

const countryAlbumFilter = (country) => {
  let filteredCountryAlbums;
  if (albums.some((album) => album.country === country)) {
    filteredCountryAlbums = albums
      .filter((album) => album.country === country)
      .sort((a1, a2) =>
        +a1.rating < +a2.rating ? 1 : +a1.rating > +a2.rating ? -1 : 0
      )[0].cover;

    return filteredCountryAlbums;
  }
};

const CountryAlbumsInfo = ({ country, count = 0 }) => {
  return (
    <>
      <div className="flex flex-col justify-between mr-[25px] w-[50%]">
        <h1 className="font-bold text-[18px] tracking-[1.25px] uppercase">
          {country ? country : "COUNTRY"}
        </h1>
        <div className="">
          {count && <h1 className="font-bold text-[28px]">{count}</h1>}

          <h1 className="text-[14px]">Total Albums</h1>
        </div>
        <div className="mt-[5px] text-[14px]">Top Ranking Album</div>
      </div>
      <div>
        {country && (
          <img src={countryAlbumFilter(country)} alt="" className="h-[145px]" />
        )}
      </div>
    </>
  );
};

export default CountryAlbumsInfo;
