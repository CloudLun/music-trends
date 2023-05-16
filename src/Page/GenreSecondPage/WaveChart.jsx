import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
// import { timeParse } from "d3-time-format";
// import { timeFormat } from "d3-time-format";
import data from "../../Data/GenrePageData/WaveChartData/genreTypesByYears.csv";

// const genres = [
//   "genre",
//   "Rock",
//   "Pop",
//   "Folk",
//   "Hip Hop",
//   "Jazz",
//   "Electronic",
//   "R&B",
//   "Ambient",
//   "Classical",
// ];

const years = [
  9997, 9998, 9999, 10000, 10001, 10002, 10003, 10004, 10005, 10006, 10007,
  10008, 10009, 2000, 20005, 2001, 20015, 2002, 20025, 2003, 20035, 2004, 20045,
  2005, 20055, 2006, 20065, 2007, 20075, 2008, 20085, 2009, 20095, 2010, 20105,
  2011, 20115, 2012, 20125, 2013, 20135, 2014, 20145, 2015, 20155, 2016, 20165,
  2017, 20175, 2018, 20185, 2019, 20195, 2020, 20205, 2021, 20215, 2022, 30000,
  30001, 30002, 30003, 30004, 30005, 30006, 30007, 30008, 30009, 300011, 300012,
  300013,
];

const realYears = [
  2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012,
  2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
];

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

const WaveChart = ({ type }) => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    const height = ref.current.clientHeight - 40;
    const width = ref.current.clientWidth;

    d3.csv(data).then((data) => {
      let metal = data.filter((d) => d["type"] === "Metal");
      let rock = data.filter((d) => d["type"] === "Rock");
      let pop = data.filter((d) => d["type"] === "Pop");
      let hipHop = data.filter((d) => d["type"] === "Hip-Hop");
      let folk = data.filter((d) => d["type"] === "Folk");
      let jazz = data.filter((d) => d["type"] === "Jazz");
      let electronic = data.filter((d) => d["type"] === "Electronic");
      let ambient = data.filter((d) => d["type"] === "Ambient");
      let rnb = data.filter((d) => d["type"] === "RnB");
      let classical = data.filter((d) => d["type"] === "Classical");

      function waveChartGeneraot(genre, Genre) {
        let genreCounts = [];
        for (let i = 0; i < genre.length; i++) {
          genreCounts.push(+genre[i].count);
          genreCounts.splice(i * 2 + 1, 0, 0);
        }

        for (let i = 0; i < 22; i++) {
          let cd = (genreCounts[2 * i + 2] - genreCounts[2 * i]) / 2;
          genreCounts[2 * i + 1] = genreCounts[2 * i] + cd;
          genre.splice(i * 2 + 1, 0, {
            year: `${genre[i * 2].year}5`,
            type: `${Genre}`,
            count: `${genreCounts[i * 2 + 1]}`,
          });
        }

        let firstCount = +genre[0].count;
        let lastCount = +genre[genre.length - 1].count;
        let firstCd = (+firstCount - 3) / 10;
        let lastCd = (+lastCount - 3) / 10;

        for (let i = 0; i < 10; i++) {
          genre.unshift({
            year: `1000${i}`,
            type: `${Genre}`,
            count: `${3 + firstCd * i}`,
          });
          genre.push({
            year: `3000${i}`,
            type: `${Genre}`,
            count: `${lastCount - lastCd * (i + 1)}`,
          });
        }

        genre.unshift({
          year: `9999`,
          type: `${Genre}`,
          count: `${2}`,
        });

        genre.unshift({
          year: `9998`,
          type: `${Genre}`,
          count: `${1.5}`,
        });

        genre.unshift({
          year: `9997`,
          type: `${Genre}`,
          count: `${1.1}`,
        });

        genre.push({
          year: `300011`,
          type: `${Genre}`,
          count: `${2}`,
        });

        genre.push({
          year: `300012`,
          type: `${Genre}`,
          count: `${1.5}`,
        });

        genre.push({
          year: `300013`,
          type: `${Genre}`,
          count: `${1.1}`,
        });

        svg
          .selectAll(`${Genre}Bar`)
          .data(genre)
          .join("rect")
          .attr("class", `Bar`)
          .attr("x", (d) => x(+d.year))
          .attr("y", (d) => y(+d.count))
          .attr("width", x.bandwidth() / 1.25)
          .attr("height", (d) => height - y(+d.count))
          .attr("fill", genreColorGenerator(Genre))
          .attr("opacity", Genre === type ? 1 : type === 'All' ? 1 : 0.1);
      }

      let x = d3.scaleBand().domain(years).range([0, width]).padding(0);
      let y = d3.scaleLinear().domain([1, 40]).range([height, 20]);

      let xAxis = d3.axisBottom(x).tickValues(realYears).tickSize(0);

      svg
        .append("text")
        .text("2000")
        .attr("font-size", "10px")
        .attr("font-weight", "thin")
        .attr("fill", "white")
        .attr("x", 0)
        .attr("y", height + 15);

      svg
        .append("text")
        .text("2022")
        .attr("font-size", "10px")
        .attr("font-weight", "thin")
        .attr("fill", "white")
        .attr("x", width - 25)
        .attr("y", height + 15);

      svg.selectAll(".yAxis").remove();
      svg.selectAll(".Bar").remove();


      waveChartGeneraot(metal, "Metal");
      waveChartGeneraot(rock, "Rock");
      waveChartGeneraot(hipHop, "Hip-Hop");
      waveChartGeneraot(pop, "Pop");
      waveChartGeneraot(folk, "Folk");
      waveChartGeneraot(electronic, "Electronic");
      waveChartGeneraot(jazz, "Jazz");
      waveChartGeneraot(ambient, "Ambient");
      waveChartGeneraot(classical, "Classical");
      waveChartGeneraot(rnb, "RnB");
    });
  });

  return <svg className="w-full h-full" ref={ref}></svg>;
};

export default WaveChart;
