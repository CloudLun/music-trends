import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { subGenreList } from "../../Data/GenrePageData/SubgenreData/subgenreList.js";
import { albums } from "../../Data/AlbumPageData/albums.js";
import { selectAll } from "d3";

import vinyl from "../../Image/black_vinyl.png";

const genres = [
  "Metal",
  "Rock",
  "Pop",
  "Folk",
  "Hip-Hop",
  "Jazz",
  "Electronic",
  "RnB",
  "Ambient",
  "Classical",
];

const representAlbums = [
  {
    genre: "Metal",
    cover:
      "https://media.pitchfork.com/photos/5929acd713d1975652139e30/1:1/w_450%2Cc_limit/fabc5bdf.jpg",
  },
  {
    genre: "Rock",
    cover:
      "https://media.pitchfork.com/photos/5929bf4ec0084474cd0c2ffd/1:1/w_450%2Cc_limit/e661e567.jpg",
  },
  {
    genre: "Pop",
    cover:
      "//e.snmc.io/i/300/s/43c57ab903a04f9550fef64d5a1ec1e0/9935583/Bj%C3%B6rk%20-%20Vespertine%2C%20Cover%20art.jpeg",
  },
  {
    genre: "Folk",
    cover:
      "https://media.pitchfork.com/photos/619410c0061137443e894a20/1:1/w_320,c_limit/100000x100000-999.jpeg",
  },
  {
    genre: "Hip-Hop",
    cover:
      "//e.snmc.io/i/300/s/3a6ce8e5e033c643a146529fd774de12/8121875/Kendrick%20Lamar%20-%20To%20Pimp%20a%20Butterfly%2C%20Cover%20art.jpeg",
  },
  {
    genre: "Jazz",
    cover:
      "//e.snmc.io/i/300/s/4a9ad7d99168eb3204c5d37341f22524/10406895/Natalia%20Lafourcade%20-%20De%20todas%20las%20flores%2C%20Cover%20art.jpeg",
  },
  {
    genre: "Electronic",
    cover:
      "//e.snmc.io/i/300/s/87473b1c21bdb9e70e33817eafb5ea59/10377265/Daft%20Punk%20-%20Discovery%2C%20Cover%20art.jpeg",
  },
  {
    genre: "RnB",
    cover:
      "//e.snmc.io/i/300/s/113c7f6e8ec2aebde66e394c9309c681/8060362/Frank%20Ocean%20-%20Blonde%2C%20Cover%20art.jpeg",
  },
  {
    genre: "Ambient",
    cover:
      "//e.snmc.io/i/300/s/56c9df7917b885cc229dd74bf6246671/10085931/Grouper%20-%20A%20I%20A%3A%20Alien%20Observer%2C%20Cover%20art.jpeg",
  },
  {
    genre: "Classical",
    cover:
      "//e.snmc.io/i/300/s/b64d391b8f2d5f83090a6535697d5f69/10474358/Floating%20Points%2C%20Pharoah%20Sanders%20%26%20The%20London%20Symphony%20Orchestra%20-%20Promises%2C%20Cover%20art.jpeg",
  },
];

const GenreNav = ({ waveChartGenerator, setGenre }) => {
  const ref = useRef(null);

  useEffect(() => {
    const svg = d3.select(ref.current);
    const height = ref.current.clientHeight;
    const width = ref.current.clientWidth;

    let targetIndex;
    let prevTargetIndex;

    // svg
    //   .append("text")
    //   .attr("class", "genreTitle")
    //   .text("Non-Mainstream Genres")
    //   .attr("fill", "white")
    //   .attr("font-size", "24px")
    //   .attr("font-weight", "bold")
    //   .attr("letter-spacing", "1.5px")
    //   .attr("x", 0)
    //   .attr("y", 60);

    // svg
    //   .append("text")
    //   .attr("class", "genreTitle")
    //   .text("Are Still Alive")
    //   .attr("fill", "white")
    //   .attr("font-size", "24px")
    //   .attr("font-weight", "bold")
    //   .attr("letter-spacing", "1.5px")
    //   .attr("x", 0)
    //   .attr("y", 90);

    // svg
    //   .append("text")
    //   .attr("class", "genreIntro")
    //   .text("Albums on the right side represent each genre")
    //   .attr("fill", "white")
    //   .attr("font-size", "12px")
    //   // .attr("letter-spacing", "1.5px")
    //   .attr("x", 0)
    //   .attr("y", 126);

    // svg
    //   .append("text")
    //   .attr("class", "genreIntro")
    //   .text("Please click any of them to check the information")
    //   .attr("fill", "white")
    //   .attr("font-size", "12px")
    //   // .attr("letter-spacing", "1.5px")
    //   .attr("x", 0)
    //   .attr("y", 144);

    svg
      .append("g")
      .selectAll("Vinyls")
      .data(representAlbums)
      .enter()
      .append("image")
      .attr("id", (d) => `vinyl-${d.genre}`)
      .attr("xlink:href", vinyl)
      .attr("width", 108)
      .attr("height", 108)
      .attr("x", 40)
      .attr("y", 65)
      .attr("opacity", 0);

    let albums = svg
      .append("g")
      .selectAll("genres")
      .data(representAlbums)
      .enter()
      .append("image")
      .attr("id", (d) => d.genre)
      .attr("class", "uncenter")
      .attr("xlink:href", (d) => d.cover)
      .attr("data-index", (d, i) => i)
      .attr("width", 120)
      .attr("height", 120)
      .attr("object-fit", "fill")
      .attr("x", (d, i) => width - 100 - ((width - 60) / 40) * (10 - i))
      .attr("y", 60)
      .on("click", (e, d) => {
        if (e.target.className.baseVal === "uncenter") {
          targetIndex &&
            d3
              .selectAll(`#vinyl-${genres[targetIndex]}`)
              .transition()
              .duration(1000)
              .attr("x", 40)
              .attr("opacity", 0);

          targetIndex &&
            d3
              .selectAll(`#${genres[targetIndex]}`)
              .transition()
              .duration(1000)
              .delay(1000)
              .attr(
                "x",
                (d, i) => width - 100 - ((width - 60) / 40) * (10 - targetIndex)
              );

          targetIndex &&
            albums
              .filter((d, i) => i === +targetIndex)
              .attr("class", "uncenter");

          targetIndex = e.target.attributes["data-index"].value;

          d3.selectAll(`#${d.genre}`)
            .transition()
            .duration(1750)
            .attr("x", 40);

          d3.selectAll(`#vinyl-${d.genre}`)
            .transition()
            .duration(1500)
            .delay(1500)
            .attr("x",  100)
            .attr("opacity", 1);

          albums.filter((d, i) => i === +targetIndex).attr("class", "center");
        } else if (e.target.className.baseVal === "center") {
          targetIndex = e.target.attributes["data-index"].value;

          d3.selectAll(`#vinyl-${d.genre}`)
            .transition()
            .duration(1000)
            .attr("x", 40)
            .attr("opacity", 0);

          d3.selectAll(`#${d.genre}`)
            .transition()
            .delay(1000)
            .duration(1000)
            .attr(
              "x",
              (d, i) => width - 100 - ((width - 60) / 40) * (10 - targetIndex)
            );
          // .attr("y", (d, i) => height / 2 - 60);

          albums.filter((d, i) => i === +targetIndex).attr("class", "uncenter");
          prevTargetIndex = e.target.attributes["data-index"].value;
        }
        setGenre(e.target.id);
      });

    // function outerCircleGenerator(genre) {
    //   arcPathGenerator(400);
    //   let data = subGenreList.filter((d) => d[0] === genre);
    //   svg
    //     .append("g")
    //     .selectAll("subgenreVinyls")
    //     .data(data)
    //     .enter()
    //     .append("image")
    //     .attr("xlink:href", vinyl)
    //     .attr("x", width / 2 - 50)
    //     .attr("y", height / 2 - 50)
    //     .attr("width", 100)
    //     .attr("height", 100)
    //     .attr("r", 6)
    //     .attr("fill", (d) => genreColorGenerator(genre))
    //     .transition()
    //     .duration(4500)
    //     .attr(
    //       "x",
    //       (d, i) =>
    //         path.node().getPointAtLength((totalLength / data.length / 2) * i)
    //           .x +
    //         width / 2 - 50
    //     )
    //     .attr(
    //       "y",
    //       (d, i) =>
    //         path.node().getPointAtLength((totalLength / data.length / 2) * i)
    //           .y +
    //         height / 2 -50
    //     )
    // }

    // function arcPathGenerator(r) {
    //   path = svg.append("path").attr("d", arcGenerator(r, r));
    //   totalLength = path.node().getTotalLength();
    // }

    // function arcGenerator(i, o) {
    //   return d3
    //     .arc()
    //     .innerRadius(i)
    //     .outerRadius(o)
    //     .startAngle(Math.PI)
    //     .endAngle(-Math.PI);
    // }
  }, []);

  return <svg className="h-full w-full" ref={ref}></svg>;
};

export default GenreNav;
