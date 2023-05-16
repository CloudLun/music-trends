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

const WaveChart = ({ filteredGenre, genreColorGenerator }) => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    const height = ref.current.clientHeight - 40;
    const width = ref.current.clientWidth;

    d3.csv(data).then((data) => {
      let filteredData = data.filter((d) => d["type"] === filteredGenre);
      // let rock = data.filter((d) => d["type"] === "Rock");
      // let pop = data.filter((d) => d["type"] === "Pop");
      // let hipHop = data.filter((d) => d["type"] === "Hip Hop");
      // let folk = data.filter((d) => d["type"] === "Folk");
      // let jazz = data.filter((d) => d["type"] === "Jazz");
      // let electronic = data.filter((d) => d["type"] === "Electronic");
      // let ambient = data.filter((d) => d["type"] === "Ambient");
      // let rnb = data.filter((d) => d["type"] === "R&B");
      // let classical = data.filter((d) => d["type"] === "Classical");
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

        // svg
        //   .append("g")
        //   .attr("transform", `translate(${-x.bandwidth() / 4}, 0)`)
        //   .call(xAxis)
        //   .select(".domain")
        //   .remove();

        // svg
        //   .selectAll(`up${prevGenre}Bar`)
        //   .data(prevGenreData)
        //   .join("rect")
        //   .attr("x", (d) => x(+d.year))
        //   .attr("y", (d) => height)
        //   .attr("width", x.bandwidth() / 1.25)
        //   .attr("height", 0)
        //   .attr("fill", genreColorGenerator(prevGenre))
        //   .attr("opacity", 0.8);

        svg
          .selectAll(`${Genre}Bar`)
          .data(genre)
          .join("rect")
          .attr("class", `${Genre}Bar`)
          .attr("x", (d) => x(+d.year))
          .attr("y", (d) => height)
          .attr("width", x.bandwidth() / 1.25)
          .attr("height", 0)
          .attr("fill", genreColorGenerator(Genre))
          .attr("opacity", 0.8);

        // svg
        //   .selectAll(`up${Genre === "R&B" ? "RNB" : Genre}Bar`)
        //   .data(genre)
        //   .join("rect")
        //   .attr("x", (d) => x(+d.year))
        //   .attr("y", (d) => height / 2)
        //   .attr("width", x.bandwidth() / 2)
        //   .attr("height", (d) => height / 2 - y(+d.count))
        //   .attr("fill", genreColorGenerator(Genre))
        //   .attr("opacity", 1);

        svg
          .selectAll(`.${Genre}Bar`)
          .transition()
          .duration(1500)
          .delay(500)
          .attr("y", (d) => y(+d.count))
          .attr("height", (d) => height - y(+d.count));

        prevGenreData = genre;
        prevGenre = Genre;
      }

      let prevGenreData;
      let prevGenre;

      let x = d3
        .scaleBand()
        .domain(years)
        .range([20, width - 40])
        .padding(0);
      let y = d3.scaleLinear().domain([1, 40]).range([height, 40]);

      let xAxis = d3.axisBottom(x).tickValues(realYears).tickSize(0);
      let yAxis = d3.axisRight(y).tickSize(width - 60);

      svg
        .append("text")
        .text("2000")
        .attr("font-size", "10px")
        .attr("font-weight", "thin")
        .attr("fill", "white")
        .attr("x", 20)
        .attr("y", height + 20);

      svg
        .append("text")
        .text("2022")
        .attr("font-size", "10px")
        .attr("font-weight", "thin")
        .attr("fill", "white")
        .attr("x", width-65)
        .attr("y", height + 20);

      svg.selectAll('.yAxis').remove()

      svg
        .append("g")
        .call(yAxis)
        .attr('class', 'yAxis')
        .attr("transform", `translate(20,0)`)
        .attr("opacity", 0.15)
        .style("stroke-dasharray", "5,3")
        .select(".domain")
        .remove();

      svg
        .selectAll("rect")
        .transition()
        .duration(1500)
        .attr("y", (d) => height)
        .attr("height", 0);

      waveChartGeneraot(filteredData, filteredGenre);

      // waveChartGeneraot(rock, "Rock");
      // waveChartGeneraot(hipHop, "Hip-Hop");
      // waveChartGeneraot(pop, "Pop");
      // waveChartGeneraot(folk, "Folk");
      // waveChartGeneraot(electronic, "Electronic");
      // waveChartGeneraot(jazz, "Jazz");
      // waveChartGeneraot(ambient, "Ambient");
      // waveChartGeneraot(classical, "Classical");
      // waveChartGeneraot(rnb, "R&B");
    });
  });

  return <svg className="w-full h-full" ref={ref}></svg>;
};

export default WaveChart;
