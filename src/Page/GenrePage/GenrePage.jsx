import React, { useState, useEffect, useRef } from "react";
import Category from "../Shared/Category";
import SubgenreList from "./SubgenreList";
import WaveChart from "./WaveChart";
import GenreNav from "./GenreNav";
import ForceLayout from "./ForceLayout";

import { types } from "../../Data/GenrePageData/genreTypes";

let subgenres = [];

for (let i = 0; i < types.length; i++) {
  subgenres.push([types[i].genre, types[i].subgenre]);
}

let subgenreSet = new Set(subgenres.map(JSON.stringify));
subgenres = Array.from(subgenreSet).map(JSON.parse);

const genreHighestRatings = [
  {
    genre: "Metal",
    rating: "3.99",
  },
  {
    genre: "Rock",
    rating: "4.21",
  },
  {
    genre: "Pop",
    rating: "4.21",
  },
  {
    genre: "Folk",
    rating: "3.91",
  },
  {
    genre: "Hip-Hop",
    rating: "4.35",
  },
  {
    genre: "Jazz",
    rating: "3.92",
  },
  {
    genre: "Electronic",
    rating: "4.03",
  },
  {
    genre: "RnB",
    rating: "4.09",
  },
  {
    genre: "Ambient",
    rating: "3.89",
  },
  {
    genre: "Classical",
    rating: "3.86",
  },
];

const GenrePage = ({
  genrePageHandler,
  countriesPageHandler,
  ratingsPageHandler,
  genreColorGenerator,
}) => {
  const [genre, setGenre] = useState("Metal");
  let genreAlbumsCount = types.filter((d) => d.genre === genre).length;
  let subgenreCount = subgenres.filter((d) => d[0] === genre).length;
  let genreHighestRating = genreHighestRatings.filter(
    (d) => d.genre === genre
  )[0];

  return (
    <div className="flex w-[100vw] h-[100vh] bg-[#242424]">
      <div className="px-[40px] w-[25%] h-full">
        <div className="pt-[60px] w-full h-[18%]">
          <Category
            page="genre"
            genrePageHandler={genrePageHandler}
            countriesPageHandler={countriesPageHandler}
            ratingsPageHandler={ratingsPageHandler}
          />
          <p className="mt-[45px] text-[30px] font-bold tracking-[1.5px] leading-[1.2]">
            Non-Mainstream Genres Are Still Alive
          </p>
          <p className="mt-[20px] text-[12px] text-[#e5e5e5]">
            Albums on the right side represent each genre <br />
            Please click any of them to check the information
          </p>
        </div>
        <div className="pt-[150px] w-[289.25px] h-[82%]">
          <p className="leading-[1.5] text-[#e5e5e5]">
            The charts show the distribution of the album over twenty years
            grouped by ten music genres which are metal, rock, pop, folk, hip
            hop, jazz, electronic, r&b, ambient, and classical.
            <br />
            <br />
            The visualizations show that surprisingly, metal genre albums
            account for huge proportions in the top 100 lists during these 23
            years. This is not a genre well accepted by the public. However,
            thanks to the music streaming platforms or online music websites,
            these subcultures still can be heard and gather communities or even
            build up special cultural identities for audiences. It reflects an
            interesting example that technology is helping diversify the scenes
            in the music world.
          </p>
        </div>
      </div>
      <div className="flex-1 px-[40px] h-full">
        <div className="w-full h-[20%]">
          <GenreNav
            genreColorGenerator={genreColorGenerator}
            setGenre={setGenre}
          />
        </div>
        <div className="flex flex-col justify-between w-full h-[80%]">
          <div className="px-[40px] w-full h-[15%]">
            <div className="grid grid-cols-[1fr_1fr_1fr_1fr] m-auto w-full">
              <div className="col-start-1 flex flex-col justify-center">
                <div className="text-[32px] font-bold">{genre}</div>
                <p className="text-[#e5e5e5]">Genre</p>
              </div>
              {/* <div className="col-start-2 flex flex-col justify-center pl-[40px]">
                  <div className="text-[32px] font-bold">1970s</div>
                  <p>Coined Year</p>
                </div> */}
              <div className="col-start-2 flex flex-col justify-center  p-[40px]">
                <div className="text-[32px] font-bold">{genreAlbumsCount}</div>
                <p className="text-[#e5e5e5]">Total Albums</p>
              </div>
              <div className="col-start-3 flex flex-col justify-center p-[40px]">
                <div className="text-[32px] font-bold">{subgenreCount}</div>
                <p className="text-[#e5e5e5]">Subgenres</p>
              </div>
              <div className="col-start-4 flex flex-col justify-center p-[40px]">
                <div className="text-[32px] font-bold">
                  {genreHighestRating.rating}
                </div>
                <p className="text-[#e5e5e5]">Highest Rating</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center pl-[40px] w-full h-[40%]">
            <div className="mb-[5px] text-[18px] font-bold tracking-[1.5px]">
              SUBGENRE DISTRIBUTION
            </div>
            <div className="mb-[20px] text-[14px] text-[#e5e5e5]">
              The subgerne counts in total genre albums from 2000 to 2022
            </div>
            <ForceLayout
              filteredGenre={genre}
              genreColorGenerator={genreColorGenerator}
            />
          </div>
          <div className="flex flex-col pl-[40px] w-full h-[50%]">
            <div className="mb-[5px] w-full text-[18px] font-bold tracking-[1.5px]">
              GENRE DISTRIBUTION
            </div>
            <div className="mb-[20px] text-[14px] text-[#e5e5e5]">
              The genre counts in total albums from 2000 to 2022
            </div>
            <div className="flex-1 w-[full] bg-[#282828]">
              <WaveChart
                genreColorGenerator={genreColorGenerator}
                filteredGenre={genre}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenrePage;
