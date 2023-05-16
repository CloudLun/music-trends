import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import albums from "../../Data/AlbumPageData/albumsFinal.csv";


const ScatterPlot = ({ genre, genreColorGenerator, toggle }) => {
  const ref = useRef(null);
  const years = [
    2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011,
    2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
  ];

  useEffect(() => {
    const svg = d3.select(ref.current);
    const height = ref.current.clientHeight;
    const width = ref.current.clientWidth;

    let yearAverageRatings = [];

    let tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .attr("visibility", "hidden")
      .attr("font-size", "8px")
      .style("display", "flex")
      .style("align-items", "start")
      .style("gap", "10px")
      .style("background", "black")
      .style("position", "absolute")
      .style("color", "white");

    d3.csv(albums).then((data) => {
      function ratingCalculator(y) {
        let yearFilteredData = data.filter((d) => +d.year === y);
        let yearFilteredRating = [];
        yearFilteredData.map((d) =>
          yearFilteredRating.push(parseFloat(d.rating))
        );
        let yearAverageRating =
          yearFilteredRating.reduce((a, b) => a + b, 0) /
          yearFilteredRating.length;
        yearAverageRatings.push({
          year: y,
          average: yearAverageRating.toFixed(3),
        });
      }

      for (let i = 0; i < 23; i++) {
        ratingCalculator(years[i]);
      }

      console.log(yearAverageRatings);

      let x = d3
        .scaleBand()
        .domain(years)
        .range([50, width - 60]);
      let xAxis = d3.axisBottom(x).tickSize(2);

      let ratings = [
        3, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4.0, 4.1, 4.2, 4.3, 4.4,
        4.5,
      ];

      let y = d3
        .scaleLinear()
        .domain([3.5, 4.5])
        .range([height - 60, 60]);

      svg
        .append("g")
        .call(d3.axisLeft(y).tickValues(ratings).tickSize(2))
        .attr("transform", `translate(40,0)`)
        .select(".domain")
        .remove();

      svg
        .append("g")
        .attr("transform", `translate(0,${height - 40})`)
        .call(xAxis)
        .select(".domain")
        .remove();

      svg.selectAll(".circle").remove();

      svg
        .selectAll("scatter")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "circle")
        .attr("cx", (d) => x(+d.year) + 24)
        .attr("cy", (d) => y(3.5))
        .attr("r", 8)
        .attr("opacity", 0.6)
        .attr("visibility", (d) =>
          genre === "All" ? "visible" : d.genre === genre ? "visible" : "hidden"
        )
        .on("mouseover", (e, d) => {
          let content = `<img src=${d.cover} width='120' height='120'/><div style="margin:10px 10px 0px 0"><p style="font-size:12px">Album: ${d.album}</p><p style="margin-top: 5px; font-size:12px">Artist: ${d.artist}</p><p style="margin-top: 5px; font-size:12px">Rating: ${d.rating}</p></div>`;
          tooltip.html(content).style("visibility", "visible");
        })
        .on("mousemove", (e, d) => {
          tooltip
            .style("top", e.pageY - (tooltip.node().clientHeight + 5) + "px")
            .style("left", e.pageX - tooltip.node().clientWidth / 2.0 + "px");
        })
        .on("mouseout", (e, d) => {
          tooltip.style("visibility", "hidden");
        })
        .attr("fill", (d) => genreColorGenerator(d.genre))
        .transition()
        .attr("cy", (d) => y(parseFloat(d.rating)))
        // .delay((d, i) => i * 5)
        .duration(1500);

      svg
        .selectAll('path')
        .data([yearAverageRatings])
        .join("path")
        .attr("fill", "none")
        .style("stroke-dasharray", "5, 5")
        .attr("stroke", "white")
        .attr("stroke-width", 5)
        .attr(
          "d",
          d3
            .line()
            .x(function (d) {
              return x(+d.year) + 24;
            })
            .y(function (d) {
              return y(parseFloat(d.average));
            })
        )
        .attr("opacity", toggle ? 1 : 0);

      svg
        .append("text")
        .text("Ratings")
        .attr("font-size", "12px")
        .attr("font-weight", "thin")
        .attr("fill", "white")
        .attr("x", 20)
        .attr("y", 20);

      // svg
      //   .selectAll("average")
      //   .data(yearAverageRatings)
      //   .enter()
      //   .append("circle")
      //   .attr("class", "circle")
      //   .attr("cx", (d) => x(+d.year) + 24)
      //   .attr("cy", (d) => y(parseFloat(d.average)))
      //   .attr("r", 8)
      //   .attr("fill", "#f2f2f2")
      //   // .style("stroke-dasharray", "3, 3")
      //   .attr("stroke", "white")
      //   .attr("stroke-width", "1px")
      //   .attr("opacity", 1);

      // svg
      //   .append("circle")
      //   .attr("cx", 24)
      //   .attr("cy", 14)
      //   .attr("r", 8)
      //   .attr("fill", genre === "All" ? "#2F519F" : genreColorGenerator(genre))
      //   .attr("opacity", 0.8);

      // svg
      //   .append("text")
      //   .text("Rating")
      //   .attr("font-size", "16px")
      //   .attr("font-weight", "thin")
      //   .attr("fill", "white")
      //   .attr("x", 20)
      //   .attr("y", 20);

      // svg
      //   .append("text")
      //   .text("Average")
      //   .attr("font-size", "18px")
      //   .attr("font-weight", "thin")
      //   .attr("fill", "white")
      //   .attr("x", width - 72.5)
      //   .attr("y", y(3.651) + 4);
    });
  });

  return <svg className="w-full h-full" ref={ref}></svg>;
};

export default ScatterPlot;
