import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

import subgenreCountData from "../../Data/GenrePageData/ForceLayoutData/subgenreCount.json";

// console.log(subgenreCount)
const counts = [651, 568, 233, 204, 258, 57, 107, 78, 51, 54];
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

const ForceLayout = ({ filteredGenre, genreColorGenerator }) => {
  const ref = useRef();

  let filteredSubgenreCountData = subgenreCountData.filter(
    (d) => d.genre === filteredGenre
  );

  useEffect(() => {
    const svg = d3.select(ref.current);
    const height = ref.current.clientHeight;
    const width = ref.current.clientWidth;

    let tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .attr("visibility", "hidden")
      .style("position", "absolute")
      .style("color", "white");

    let x = d3
      .scaleLinear()
      .domain([0, 100])
      .range([20, width - 20]);

    let xAxis = d3.axisBottom(x).tickSize(0);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height / 2})`)
      .attr("opacity", 0.1)
      .call(xAxis);

    svg
      .append("circle")
      .attr("cx", 0)
      .attr("cy", height / 2 - 50)
      .attr("r", 5)
      .attr("fill", "red")
      .attr("opacity", 0.5);

    svg
      .selectAll("circle")
      .data(filteredSubgenreCountData)
      .join("circle")
      .attr("cx", 0)
      .attr("cy", height / 2)
      .attr("r", (d) => 13)
      .attr("fill", genreColorGenerator(filteredGenre))
      .attr("opacity", 0.5)
      .on("mouseover", (e, d) => {
        let content = `${d.subgenre}<br/>count: ${d.count}`;
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
      .transition()
      .duration(1000)
      .attr("cx", (d) => x(d.count))
      .attr("cy", height / 2);

    svg
      .append("circle")
      .attr("cx", 20)
      .attr("cy", 30)
      .attr("r", 5)
      .attr("fill", genreColorGenerator(filteredGenre))
      .attr("opacity", 0.8);

    svg
      .append("text")
      .text("SUBGENRE")
      .attr("fill", "white")
      .attr("font-size", "14px")
      .attr("font-weight", "regular")
      .attr("letter-spacing", "1.2px")
      .attr("x", 30)
      .attr("y", 34);
  });

  return <svg className="relative w-full h-[50%] bg-[#282828]" ref={ref}></svg>;
};

export default ForceLayout;
