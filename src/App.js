import React from "react";

import LandingPage from "./Page/LandingPage/LandingPage";
import AlbumsPage from "./Page/AlbumPage/AlbumsPage";
import GenrePage from "./Page/GenrePage/GenrePage";
import CountryPage from "./Page/CountryPage/CountryPage";
import GenreSecondPage from "./Page/GenreSecondPage/GenreSecondPage";
import RatingPage from "./Page/RatingPage/RatingPage";
import EndingPage from "./Page/EndingPage.jsx/EndingPage";

const genrePageHandler = () => {
  window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
};

const countriesPageHandler = () => {
  window.scrollTo({ top: window.innerHeight * 3, behavior: "smooth" });
};

const ratingsPageHandler = () => {
  window.scrollTo({ top: window.innerHeight * 4, behavior: "smooth" });
};

const genreColorGenerator = (genre) => {
  return genre === "Metal"
    ? "#cccccc"
    : genre === "Rock"
    ? "#FF9B06"
    : genre === "Pop"
    ? "#F15BB5"
    : genre === "Folk"
    ? "#B2C381"
    : genre === "Hip_Hop"
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

function App() {
  return (
    <div className="w-[100vw] h-[100vh] first-letter: text-white bg-[#242424]">
      <LandingPage />
      <AlbumsPage />
      <GenrePage
        genrePageHandler={genrePageHandler}
        countriesPageHandler={countriesPageHandler}
        ratingsPageHandler={ratingsPageHandler}
        genreColorGenerator={genreColorGenerator}
      />
      <GenreSecondPage
        genrePageHandler={genrePageHandler}
        countriesPageHandler={countriesPageHandler}
        ratingsPageHandler={ratingsPageHandler}
        genreColorGenerator={genreColorGenerator}
      />
      <CountryPage
        genrePageHandler={genrePageHandler}
        countriesPageHandler={countriesPageHandler}
        ratingsPageHandler={ratingsPageHandler}
        genreColorGenerator={genreColorGenerator}
      />
      <RatingPage
        genrePageHandler={genrePageHandler}
        countriesPageHandler={countriesPageHandler}
        ratingsPageHandler={ratingsPageHandler}
        genreColorGenerator={genreColorGenerator}
      />
      <EndingPage />
    </div>
  );
}

export default App;
