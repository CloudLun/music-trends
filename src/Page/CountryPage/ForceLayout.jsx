import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

import albums from "../../Data/CountryPageData/albumsCountsByCountry.geojson";

const radiusGnereator = (c) => {
  return c > 200
    ? 40
    : c > 120
    ? 30
    : c > 80
    ? 20
    : c > 40
    ? 10
    : c > 10
    ? 5
    : 3;
};

const polygonColorGnereator = (c) => {
  return c > "200"
    ? "#2f519f"
    : c > 120
    ? "#4362a8"
    : c > 80
    ? "#5873b2"
    : c > 40
    ? "#6d85bb"
    : c > 10
    ? "#8296c5"
    : c > 0
    ? "#97a8cf"
    : "#eaedf5";
};

const ForceLayout = () => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    const height = ref.current.clientHeight;
    const width = ref.current.clientWidth;

    d3.json(albums).then((data) => {
      let x = d3
        .scaleLinear()
        .domain([0, 1])
        .range([10, width/2.75]);
      let countryData = [];

      data.features.map((d) =>
        countryData.push({
          country: d.properties.country,
          counts: d.properties.counts,
        })
      );

      console.log(countryData);

      let simulation = d3
        .forceSimulation(countryData)
        .force("charge", d3.forceManyBody().strength(3))
        .force("center", d3.forceCenter(width/6 , height/2))
        .force(
          "x",
          d3.forceX().x((d, i) => x(d.counts / 100))
        )
        .force(
          "y",
          d3.forceY().y((d) => height)
        )
        .force(
          "collision",
          d3.forceCollide().radius(function (d) {
            return radiusGnereator(d.counts)
          })
        )
        .on("tick", ticked);

      function ticked() {
        d3.select(ref.current)
          .selectAll("circle")
          .data(countryData)
          .join("circle")
          .attr("r", function (d) {
            return radiusGnereator(d.counts);
          })
          .style("fill", function (d) {
            return polygonColorGnereator(d.counts);
          })
          .attr("cx", function (d) {
            return d.x;
          })
          .attr("cy", function (d) {
            return d.y;
          })
          .attr("opacity", 1);
      }
    });
  });

  return <svg className="relative w-full h-full" ref={ref}></svg>;
};

export default ForceLayout;
