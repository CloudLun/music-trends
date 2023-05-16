import React from "react";

const Category = ({
  page,
  genrePageHandler,
  countriesPageHandler,
  ratingsPageHandler,
}) => {
  return (
    <div className="flex gap-[20px] mb-[5px] text-[13px]  font-bold tracking-[1.5px] cursor-pointer">
      <div
        className={page === "genre" ? "text-white" : "text-[#525252]"}
        onClick={genrePageHandler}
      >
        GENRE
      </div>
      <div>|</div>
      <div
        className={page === "countries" ? "text-white" : "text-[#525252]"}
        onClick={countriesPageHandler}
      >
        COUNTRIES
      </div>
      <div>|</div>
      <div
        className={page === "ratings" ? "text-white" : "text-[#525252]"}
        onClick={ratingsPageHandler}
      >
        RATINGS
      </div>
    </div>
  );
};

export default Category;
