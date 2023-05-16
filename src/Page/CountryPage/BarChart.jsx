import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

import albums from "../../Data/CountryPageData/albumsByCountry.geojson";

let lastProportion = 0;
const BarChart = ({ country }) => {
  const ref = useRef(null);

  useEffect(() => {
    const svg = d3.select(ref.current);
    const height = ref.current.clientHeight;
    const width = ref.current.clientWidth;

    let countryAlbumsData = [];
    let countryAlbumsDataProportion;

    d3.json(albums).then((albums) => {
      albums.features.map((a) => {
        if (a.properties.country === country)
          countryAlbumsData.push(a.properties);
      });
      countryAlbumsDataProportion = (countryAlbumsData.length / 2300) * 100;

      console.log(countryAlbumsData.length);
      console.log(countryAlbumsDataProportion);

      let x = d3
        .scaleLinear()
        .domain([0, 50])
        .range([40, width - 40]);
      let xAxis = d3.axisBottom(x).tickValues([0,5,10,25,50]).tickSize(4);

      svg
        .append("g")
        .attr("transform", `translate(0, ${height / 2})`)
        .attr("opacity", 1)
        .style("stroke-dasharray", "2.5")
        .call(xAxis);

      svg.selectAll()

      // svg
      //   .append("circle")
      //   .attr("class", "propCircle")
      //   .attr("r", 4)
      //   .attr("cx", x(lastProportion))
      //   .attr("cy", height / 2)
      //   .attr("fill", "white");

      // svg
      //   .append("circle")
      //   .attr("class", "propCircle")
      //   .attr("r", 15)
      //   .attr("cx", x(lastProportion))
      //   .attr("cy", height / 2)
      //   .attr("fill", "#2F519F")
      //   .attr("opacity", 0.5);

      // svg
      //   .selectAll(".propCircle")
      //   .transition()
      //   .duration(1000)
      //   .attr("cx", x(countryAlbumsDataProportion));

      // lastProportion = countryAlbumsDataProportion;
    });
  });

  return <svg className="h-full w-full" ref={ref}></svg>;
};

export default BarChart;
