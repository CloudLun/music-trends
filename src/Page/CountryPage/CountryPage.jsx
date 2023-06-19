import React, { useRef, useEffect, useState } from "react";
import Map, { Source, Layer } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import { albums } from "../../Data/AlbumPageData/albums";
import albumsCountsByCountry from "../../Data/CountryPageData/albumsCountsByCountryPolygon.geojson";
import * as d3 from "d3";

import BarChart from "./BarChart";
import GenreProportion from "./GenreProportion";
import ForceLayout from "./ForceLayout";

import CountryAlbumsInfo from "./CountryAlbumsInfo";

import Category from "../Shared/Category";

const radiusGnereator = (c) => {
  return c > 200
    ? 50
    : c > 120
    ? 50
    : c > 80
    ? 25
    : c > 40
    ? 15
    : c > 10
    ? 10
    : 5;
};

const polygonColorGnereator = (c) => {
  return c > "200"
    ? "#ffffff"
    : c > 120
    ? "#ededed"
    : c > 80
    ? "#dbdbdb"
    : c > 40
    ? "#c0c0c0"
    : c > 20
    ? "#aeaeae"
    : c > 0
    ? "#959595"
    : "#424242";
};

const CountryPage = ({
  genrePageHandler,
  countriesPageHandler,
  ratingsPageHandler,
  genreColorGenerator,
}) => {
  const [country, setCountry] = useState("");
  const [count, setCount] = useState(0);

  const width = window.innerWidth * 0.8;
  const height = window.innerHeight;

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(14.128);
  const [lat, setLat] = useState(25.915);
  const [zoom, setZoom] = useState(1.65);

  let filteredAlbums = [];

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiY2xvdWRsdW4iLCJhIjoiY2s3ZWl4b3V1MDlkejNkb2JpZmtmbHp4ZiJ9.MbJU7PCa2LWBk9mENFkgxw";
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current, // container ID
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: "mapbox://styles/cloudlun/cl2eq8ceb000a15o06rah6zx5", // style URL
      center: [lng, lat], // starting position [lng, lat]
      zoom: zoom, // starting zoom
      interactive: true,
    });
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    let transform = d3.geoTransform({ point: projectPoint });
    let path = d3.geoPath().projection(transform);
    // let container = map.getCanvasContainer();

    function projectPoint(lon, lat) {
      var point = map.current.project(new mapboxgl.LngLat(lon, lat));
      this.stream.point(point.x, point.y);
    }

    d3.json(albumsCountsByCountry).then((data) => {
      const svg = d3
        .select(mapContainer.current)
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .style("position", "absolute")
        .style("z-index", 2);

      let polygons = svg
        .selectAll("polygons")
        .data(data.features)
        .enter()
        .append("path")
        .attr("stroke", "#e4e4e4")
        .attr("stroke-width", 0.1)
        .attr("fill", (d) => polygonColorGnereator(d.properties.counts))
        .attr("fill-opacity", 0.8)
        .on("click", (e, d) => {
          setCountry(d.properties.ADMIN);
          setCount(d.properties.counts);
        });

      function render() {
        polygons.attr("d", path);
      }
      render();
      map.current.on("viewreset", render);
      map.current.on("move", render);
      map.current.on("moveend", render);
    });
  }, [map.current]);

  return (
    <div className="flex w-full h-[100vh] bg-[#242424]">
      <div className="px-[40px] w-[25%] h-full">
        <div className="w-full">
          <div className="pt-[60px] w-full h-[18%]">
            <Category
              page="countries"
              genrePageHandler={genrePageHandler}
              countriesPageHandler={countriesPageHandler}
              ratingsPageHandler={ratingsPageHandler}
            />
            <p className="mt-[45px] text-[30px] font-bold tracking-[1.5px] leading-[1.2]">
              Albums Geographically Centralized
            </p>
            <p className="mt-[20px] w-[289.25px] text-[12px] text-[#e5e5e5]">
              Click the countries to check the proportion of each genre in
              countries
            </p>
          </div>
          <div className="pt-[150px] w-[289.25px] h-[82%]">
            <p className="leading-[1.5] text-[#e5e5e5]">
              As for the country's perspective, Though you can find 57
              countries' music in the top list over these 20 years, the United
              States and United Kingdom account for over half of the total
              albums. Japan is in the third place which occupies around 7%. Many
              countries only have 1 or 2 albums appear in the list.
              <br />
              <br />
              These numbers reveal that even if we have more resources and
              methods to listen to music all around the world, the songs and
              albums which are easily seen by audiences are still from the
              cultural power nations. There are tons of great music works needed
              to be discovered especially in African and Asian areas.
            </p>
          </div>
        </div>
      </div>
      <div className="relative pt-[60px] ml-[60px] w-[75%] h-full">
        {/* <div className="flex pt-[60px] w-full h-[25%]"> */}
        <div className="absolute top-[90px] left-[15px] flex p-[15px] w-[330px] h-[180px] bg-[#282828] z-20">
          <CountryAlbumsInfo country={country} count={count} />
        </div>
        <div className="absolute top-[90px] right-[15px] flex flex-col p-[15px] w-[360px] h-[180px] bg-[#282828] z-20">
          <div className="text-[14px] font-bold tracking-[1.5px]">
            GENRE PROPORTION
          </div>
          <div className="pt-[2.5px] pb-[10px] text-[12px]">
            The genre counts in total albums from selected country
          </div>
          <div className="flex items-center flex-1  h-[60px] ">
            <GenreProportion
              country={country}
              genreColorGenerator={genreColorGenerator}
            />
          </div>
        </div>
        <div className="absolute left-[15px] bottom-[30px] p-[15px] w-[135px] h-[270px] bg-[#282828] z-20">
          <h1 className="pb-[10px] text-[14px] font-bold tracking-[1.5px]">
            Total Albums by Country
          </h1>
          <div className="flex flex-col gap-[8px]">
            <div className="flex items-center gap-[4px]">
              <div className="block w-[15px] h-[15px] bg-[#ffffff]"></div>
              <div className="text-[12px] "> &gt; 200</div>
            </div>
            <div className="flex items-center gap-[4px]">
              <div className="block w-[15px] h-[15px] bg-[#ededed]"></div>
              <div className="text-[12px]"> &gt; 120</div>
            </div>
            <div className="flex items-center gap-[4px]">
              <div className="block w-[15px] h-[15px] bg-[#dbdbdb]"></div>
              <div className="text-[12px]"> &gt; 80</div>
            </div>
            <div className="flex items-center gap-[4px]">
              <div className="block w-[15px] h-[15px]  bg-[#c0c0c0]"></div>
              <div className="text-[12px]"> &gt; 40</div>
            </div>
            <div className="flex items-center gap-[4px]">
              <div className="block w-[15px] h-[15px] bg-[#aeaeae]"></div>
              <div className="text-[12px]"> &gt; 20</div>
            </div>
            <div className="flex items-center gap-[4px]">
              <div className="block w-[15px] h-[15px] bg-[#959595]"></div>
              <div className="text-[12px]"> &gt; 0</div>
            </div>
            <div className="flex items-center gap-[4px]">
              <div className="block w-[15px] h-[15px] bg-[#424242]"></div>
              <div className="text-[12px]"> = 0</div>
            </div>
          </div>
        </div>
        {/* </div> */}
        <div ref={mapContainer} className="map-container w-full h-full"></div>
      </div>
    </div>
  );
};

export default CountryPage;

{
  /* <TotalPercentage country={country} /> */
}
