import React from "react";

import LandingPage from "./Page/LandingPage/LandingPage";
import AlbumsPage from "./Page/AlbumPage/AlbumsPage";
import GenrePage from "./Page/GenrePage/GenrePage";
import CountryPage from "./Page/CountryPage/CountryPage";
import GenreSecondPage from "./Page/GenreSecondPage/GenreSecondPage";
import RatingPage from "./Page/RatingPage/RatingPage";
import EndingPage from "./Page/EndingPage.jsx/EndingPage";

function App() {
  return (
    <div className="w-[100vw] h-[100vh] first-letter: text-white bg-[#242424]">
      <LandingPage />
      <AlbumsPage />
      <GenrePage />
      <GenreSecondPage />
      <CountryPage />
      <RatingPage />
      <EndingPage />
    </div>
  );
}

export default App;
