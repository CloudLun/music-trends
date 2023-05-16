import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

import { genreTypeCountsByYearData } from "../../Data/GenrePageData/FlowerChartData/genreTypeCountsByYears";
import { totalRelease } from "../../Data/RatingPage/totalRelease";

let genres = [
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

let scores = [4.2, 3.5, 4, 3.6, 3.7, 2, 4, 5, 2.5, 3.6];

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

const circlesCount = [100, 200, 400];
const circlesColor = ["#525252", "#686868", "#7e7e7e"];

let year;

const RadarChart = ({ play, genre }) => {
  const ref = useRef();

  const years = [
    2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011,
    2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
  ];

  const animationYearsIndex = [0, 5, 10, 15, 20, 21, 22];

  useEffect(() => {
    const svg = d3.select(ref.current);
    const height = ref.current.clientHeight;
    const width = ref.current.clientWidth;

    let coordinates = [];
    let coordinatesTotal = [];
    let radialScale = d3.scaleLinear().domain([0, 40]).range([0, 400]);
    let radialScaleTotal = d3.scaleLinear().domain([0, 30000]).range([0, 400]);
    let data = [];
    let totalData = [];
    let line = d3
      .line()
      .x((d) => d.x)
      .y((d) => d.y);

    for (let y = 0; y < 23; y++) {
      let genreTypeCountsByYearFilteredData = genreTypeCountsByYearData.filter(
        (g) => g.year === years[y]
      )[0].types;
      data.push(
        genreTypeCountsByYearFilteredData.map((g, i) => {
          let angle = Math.PI / 2 + (2 * Math.PI * i) / 10;
          return {
            year: years[y],
            name: g.type,
            angle: angle,
            line_coord: angleToCoordinate(angle, 40),
            label_coord: angleToCoordinate(angle, 12),
            count: g.counts,
          };
        })
      );
    }

    svg.selectAll(".line").remove();
    svg.selectAll(".dot").remove();
    svg.selectAll(".year").remove();

    svg
      .selectAll("line")
      .data(data[0])
      .join((enter) =>
        enter
          .append("line")
          .attr("x1", width / 2)
          .attr("y1", height / 2)
          .attr("x2", (d) => d.line_coord.x)
          .attr("y2", (d) => d.line_coord.y)
      )
      .attr("stroke", "white")
      .attr("opacity", 0.08);

    svg.selectAll(".backgroundCircle").remove();

    svg
      .append("g")
      .selectAll("circles")
      .data(circlesCount)
      .enter()
      .append("circle")
      .attr("class", "backgroundCircle")
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .attr("fill", (d, i) => circlesColor[i])
      //   .attr("stroke", "gray")
      .attr("r", (d) => d)
      .attr("opacity", 0.1)
      .style("z-index", 0);

    svg
      .selectAll("chartLines")
      .data(data[0])
      .enter()
      .append("line")
      .attr("class", "line")
      .attr("x1", width / 2)
      .attr("y1", height / 2)
      .attr("x2", (d) => angleToCoordinate(d.angle, d.count + 2).x)
      .attr("y2", (d) => angleToCoordinate(d.angle, d.count + 2).y)
      .attr("stroke", (d) => genreColorGenerator(d.name))
      .attr("stroke-width", "1.8px")
      .attr("opacity", (d) =>
        genre === "All" ? 0.6 : d.name === genre ? 1 : 0.2
      );

    svg
      .selectAll("dots")
      .data(data[0])
      .join("circle")
      .attr("class", "dot")
      .attr("cx", (d) => angleToCoordinate(d.angle, d.count + 2).x)
      .attr("cy", (d) => angleToCoordinate(d.angle, d.count + 2).y)
      .attr("r", 8)
      .attr("fill", (d) => genreColorGenerator(d.name))
      .attr("opacity", (d) =>
        genre === "All" ? 0.6 : d.name === genre ? 0.8 : 0.2
      );

    svg
      .selectAll("labels")
      .data(data[0])
      .enter()
      .append("text")
      .attr("class", "label")
      .text((d, i) => genres[i])
      .style("font-size", "14px")
      .attr("fill", "white")
      .attr("opacity", 0.4)
      .attr("x", (d) =>
        d.name === "Classical"
          ? angleToCoordinate(d.angle, d.count + 2).x - 29
          : d.name === "Ambient"
          ? angleToCoordinate(d.angle, d.count + 2).x - 29
          : d.name === "Hip_Hop"
          ? angleToCoordinate(d.angle, d.count + 2).x - 27
          : d.name === "Electronic"
          ? angleToCoordinate(d.angle, d.count + 2).x - 29
          : d.name === "Folk"
          ? angleToCoordinate(d.angle, d.count + 2).x - 15
          : d.name === "Pop"
          ? angleToCoordinate(d.angle, d.count + 2).x - 15
          : d.name === "R&B"
          ? angleToCoordinate(d.angle, d.count + 2).x - 12
          : d.name === "Metal"
          ? angleToCoordinate(d.angle, d.count + 2).x - 20
          : angleToCoordinate(d.angle, d.count + 2).x - 18
      )
      .attr("y", (d) => angleToCoordinate(d.angle, d.count + 2).y + 18);

    svg
      .append("text")
      .text(years[0])
      .attr("class", "year")
      .style("font-size", "32px")
      .style("font-weight", "bold")
      .attr("x", 0)
      .attr("y", 158)
      .attr("fill", "white");

    play && chartAnimationHandler();

    function dotUpdateHandler(updatedData, i) {
      let lines = svg
        .selectAll(".line")
        .data(updatedData)
        .join("line")
        .transition()
        .duration(780)
        .ease(d3.easeLinear)
        .attr("x2", (d) => angleToCoordinate(d.angle, d.count + 2).x)
        .attr("y2", (d) => angleToCoordinate(d.angle, d.count + 2).y);

      let dots = svg
        .selectAll(".dot")
        .data(updatedData)
        .join("circle")
        .transition()
        .duration(800)
        .ease(d3.easeLinear)
        .attr("cx", (d) => angleToCoordinate(d.angle, d.count + 2).x)
        .attr("cy", (d) => angleToCoordinate(d.angle, d.count + 2).y);

      let labels = svg
        .selectAll(".label")
        .data(updatedData)
        .join("text")
        .text((d, i) => genres[i])
        .style("font-size", "14px")
        .attr("fill", "white")
        .attr("opacity", 0.5)
        .transition()
        .duration(800)
        .ease(d3.easeLinear)
        .attr("x", (d) =>
          d.name === "Classical"
            ? angleToCoordinate(d.angle, d.count + 2).x - 29
            : d.name === "Ambient"
            ? angleToCoordinate(d.angle, d.count + 2).x - 29
            : d.name === "Hip_Hop"
            ? angleToCoordinate(d.angle, d.count + 2).x - 27
            : d.name === "Electronic"
            ? angleToCoordinate(d.angle, d.count + 2).x - 29
            : d.name === "Folk"
            ? angleToCoordinate(d.angle, d.count + 2).x - 15
            : d.name === "Pop"
            ? angleToCoordinate(d.angle, d.count + 2).x - 15
            : d.name === "R&B"
            ? angleToCoordinate(d.angle, d.count + 2).x - 12
            : d.name === "Metal"
            ? angleToCoordinate(d.angle, d.count + 2).x - 20
            : angleToCoordinate(d.angle, d.count + 2).x - 18
        )
        .attr("y", (d) => angleToCoordinate(d.angle, d.count + 2).y + 20);

      let year = svg
        .selectAll(".year")
        .text(years[i])
        .style("font-size", "32px")
        .style("font-weight", "bold")
        .attr("x", 0)
        .attr("y", 158)
        .attr("fill", "white");
    }

    function chartAnimationHandler() {
      for (let i = 0; i < 7; i++) {
        let animation = setInterval(function () {
          dotUpdateHandler(data[animationYearsIndex[i]], animationYearsIndex[i]);
          clearInterval(animation);
        }, 2000 * i);
      }
    }

    function angleToCoordinate(angle, value) {
      let x = Math.cos(angle) * radialScale(value);
      let y = Math.sin(angle) * radialScale(value);
      return { x: width / 2 + x, y: height / 2 - y };
    }

    // for (let y = 0; y < 23; y++) {
    //   let totalReleaseFilteredData = totalRelease.filter(
    //     (g) => g.year === years[y]
    //   )[0];
    //   totalData[y] = [];
    //   for (let i = 0; i < 10; i++) {
    //     let angle = Math.PI / 2 + (2 * Math.PI * i) / 10;
    //     totalData[y].push({
    //       year: totalReleaseFilteredData.year,
    //       name: genres[i],
    //       angle: angle,
    //       line_coord: angleToCoordinateTotal(angle, 40),
    //       label_coord: angleToCoordinate(angle, 12),
    //       count: totalReleaseFilteredData[genres[i]],
    //     });
    //   }
    // }

    // function angleToCoordinateTotal(angle, value) {
    //   let x = Math.cos(angle) * radialScaleTotal(value);
    //   let y = Math.sin(angle) * radialScaleTotal(value);
    //   return { x: width / 2 + x, y: height / 2 - y };
    // }
    // function getPathCoordinatesTotal() {
    //   for (var i = 0; i < 10; i++) {
    //     let angle = Math.PI / 2 + (2 * Math.PI * i) / 10;
    //     coordinatesTotal.push(getPathCoordinatesTotal(angle, totalData[0][i].count));
    //   }
    //   return coordinatesTotal;
    // }
  });

  return <svg className="w-full h-full" ref={ref}></svg>;
};

export default RadarChart;

// let rock = [];
// let metal = [];
// let pop = [];
// let folk = [];
// let hip_hop = [];
// let jazz = [];
// let electronic = [];
// let ambient = [];
// let rnb = [];
// let classical = [];
// let others = [];

// genreTypeCountsByYearData.map((d, i) => {
//   d.types.map((t) => {
//     if (t.type === "Metal") metal.push(t);
//     if (t.type === "Rock") rock.push(t);
//     if (t.type === "Pop") pop.push(t);
//     if (t.type === "Hip_Hop") hip_hop.push(t);
//     if (t.type === "Folk") folk.push(t);
//   });
// });

// setTimeout(dotUpdateHandler(data[1]), 4000);

// svg
//   .selectAll(`MetalPath`)
//   .data(data)
//   .join((enter) =>
//     enter
//       .append("path")
//       .datum((d) => getPathCoordinates(metal))
//       .attr("d", line)
//       .attr("stroke-width", 2)
//       .attr("stroke", genreColorGenerator("Metal"))
//       .attr("fill", genreColorGenerator("Metal"))
//       .attr("opacity", 0.01)
//       .attr("stroke-opacity", 1)
//   );

// svg
//   .selectAll(`path`)
//   .data(data)
//   .enter()
//   .append("path")
//   .attr("class", "path")
//   .datum((d) => getPathCoordinates(data[0]))
//   .attr("d", line)
//   .attr("stroke-width", 1)
//   .attr("stroke", "#2F519F")
//   .attr("fill", "#2F519F")
//   .attr("opacity", 0.02)
//   .attr("stroke-opacity", 1);

// svg
//   .selectAll("totalRelease")
//   .data(totalData[0])
//   .join("circle")
//   .attr("class", "dot")
//   .attr("cx", (d) => angleToCoordinateTotal(d.angle, d.count).x)
//   .attr("cy", (d) => angleToCoordinateTotal(d.angle, d.count).y)
//   .attr("r", 5)
//   .attr("fill", "none")
//   .attr("opacity", 1);

// svg
//   .selectAll(`path`)
//   .data(totalData[0])
//   .enter()
//   .append("path")
//   .attr("class", "path")
//   .datum((d) => getPathCoordinatesTotal(totalData[0]))
//   .attr("d", line)
//   .attr("stroke-width", 1)
//   .attr("stroke", "#FFC300")
//   .attr("fill", "#FFC300")
//   .attr("opacity", 0.02)
//   .attr("stroke-opacity", 1);

// let path = svg
//   .selectAll(".path")
//   .datum((d) => getPathCoordinates(updatedData))
//   .transition()
//   .duration(800)
//   .attr("d", line)
//   .ease(d3.easeLinear)
//   .attr("stroke-width", 1)
//   .attr("stroke", "#2F519F")
//   .attr("fill", "none")
//   .attr("opacity", 0.02)
//   .attr("stroke-opacity", 1);

// function getPathCoordinates(data) {
//   for (var i = 0; i < 10; i++) {
//     let angle = Math.PI / 2 + (2 * Math.PI * i) / 10;
//     coordinates.push(angleToCoordinate(angle, data[i].count + 2));
//   }
//   return coordinates;
// }
