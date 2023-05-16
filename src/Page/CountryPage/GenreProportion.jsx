import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

import albumsByCountry from "../../Data/CountryPageData/albumsByCountry.geojson";
import { albums } from "../../Data/AlbumPageData/albums";

const GenreProportion = ({ country, genreColorGenerator }) => {
  const ref = useRef(null);

  useEffect(() => {
    let rock = [];
    let metal = [];
    let pop = [];
    let folk = [];
    let hip_hop = [];
    let jazz = [];
    let electronic = [];
    let ambient = [];
    let rnb = [];
    let classical = [];
    let others = [];

    let pastMetalLength = 0;
    let pastRockLength = 0;
    let pastPopLength = 0;
    let pastFolkLength = 0;
    let pastHipHopLength = 0;
    let pastJazzLength = 0;
    let pastElectronicLength = 0;
    let pastAmbientLength = 0;
    let pastRnBLength = 0;
    let pastClassicalLength = 0;

    let tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .attr("visibility", "hidden")
      .style("z-index", 100)
      .style("position", "absolute")
      .style("color", "white");

    const genreFilteredHandler = (genre) => {
      if (genre.includes("Rock")) rock.push(genre);
      if (genre.includes("Hardcore")) rock.push(genre);
      if (genre.includes("Screamo")) rock.push(genre);
      if (genre.includes("Emo")) rock.push(genre);
      if (genre.includes("Punk")) rock.push(genre);
      if (genre.includes("Shoegaze")) rock.push(genre);
      if (genre.includes("Zeuhl")) rock.push(genre);
      if (genre.includes("Avant-Prog")) rock.push(genre);
      if (genre.includes("Neo-Psychedelia")) rock.push(genre);
      if (genre.includes("Riot Grrrl")) rock.push(genre);
      if (genre.includes("Symphonic Prog")) rock.push(genre);
      if (genre.includes("Slowcore")) rock.push(genre);
      if (genre.includes("Neocrust")) rock.push(genre);
      if (genre.includes("UK Garage")) rock.push(genre);
      if (genre.includes("D-Beat")) rock.push(genre);
      if (genre.includes("rock")) rock.push(genre);
      if (genre.includes("AOR")) rock.push(genre);
      if (genre.includes("Yakousei")) rock.push(genre);
      if (genre.includes("Tishoumaren")) rock.push(genre);
      if (genre.includes("Heavy Psych")) rock.push(genre);
      if (genre.includes("Queercore")) rock.push(genre);
      if (genre.includes("Stenchcore")) rock.push(genre);
      if (genre.includes("Swancore")) rock.push(genre);
      if (genre.includes("New Wave")) rock.push(genre);
      if (genre.includes("Blackgaze")) metal.push(genre);
      if (genre.includes("Metal")) metal.push(genre);
      if (genre.includes("Grindcore")) metal.push(genre);
      if (genre.includes("grind")) metal.push(genre);
      if (genre.includes("Deathcore")) metal.push(genre);
      if (genre.includes("Neo-Prog")) metal.push(genre);
      if (genre.includes("Mathcore")) metal.push(genre);
      if (genre.includes("Djent")) metal.push(genre);
      if (genre.includes("Powerviolence")) metal.push(genre);
      if (genre.includes("Folk")) folk.push(genre);
      if (genre.includes("Singer-Songwriter")) folk.push(genre);
      if (genre.includes("Country")) folk.push(genre);
      if (genre.includes("Americana")) folk.push(genre);
      if (genre.includes("American Primitivism")) folk.push(genre);
      if (genre.includes("Celtic")) folk.push(genre);
      if (genre.includes("folk")) folk.push(genre);
      if (genre.includes("blues")) folk.push(genre);
      if (genre.includes("Blues")) folk.push(genre);
      if (genre.includes("Acoustic")) folk.push(genre);
      if (genre.includes("Pop")) pop.push(genre);
      if (genre.includes("Bubblegum Bass")) pop.push(genre);
      if (genre.includes("pop")) pop.push(genre);
      if (genre.includes("Akishibu-kei")) pop.push(genre);
      if (genre.includes("Shibuya-kei")) pop.push(genre);
      if (genre.includes("Alternative Dance")) pop.push(genre);
      if (genre.includes("Indietronica")) pop.push(genre);
      if (genre.includes("Plunderphonics")) pop.push(genre);
      if (genre.includes("Minimal Wave")) pop.push(genre);
      if (genre.includes("Rap")) hip_hop.push(genre);
      if (genre.includes("Trap")) hip_hop.push(genre);
      if (genre.includes("Drumless")) hip_hop.push(genre);
      if (genre.includes("Boom Bap")) hip_hop.push(genre);
      if (genre.includes("Hop")) hip_hop.push(genre);
      if (genre.includes("Horrorcore")) hip_hop.push(genre);
      if (genre.includes("Grime")) hip_hop.push(genre);
      if (genre.includes("Dirty South")) hip_hop.push(genre);
      if (genre.includes("Wonky")) hip_hop.push(genre);
      if (genre.includes("Deconstructed Club")) hip_hop.push(genre);
      if (genre.includes("Miami Bass")) hip_hop.push(genre);
      if (genre.includes("UK Bass")) hip_hop.push(genre);
      if (genre.includes("Jazz")) jazz.push(genre);
      if (genre.includes("Wolof Music")) jazz.push(genre);
      if (genre.includes("Liquid Drum and Bass")) jazz.push(genre);
      if (genre.includes("Post-Bop")) jazz.push(genre);
      if (genre.includes("Progressive Bluegrass")) jazz.push(genre);
      if (genre.includes("Electro")) electronic.push(genre);
      if (genre.includes("Future Bass")) electronic.push(genre);
      if (genre.includes("Vaporwave")) electronic.push(genre);
      if (genre.includes("House")) electronic.push(genre);
      if (genre.includes("Minimal Drum and Bass")) electronic.push(genre);
      if (genre.includes("Industrial")) electronic.push(genre);
      if (genre.includes("Nu-Disco")) electronic.push(genre);
      if (genre.includes("Neurofunk")) electronic.push(genre);
      if (genre.includes("Chillwave")) electronic.push(genre);
      if (genre.includes("Experimental")) electronic.push(genre);
      if (genre.includes("IDM")) electronic.push(genre);
      if (genre.includes("Dubstep")) electronic.push(genre);
      if (genre.includes("House")) electronic.push(genre);
      if (genre.includes("Techno")) electronic.push(genre);
      if (genre.includes("EAI")) electronic.push(genre);
      if (genre.includes("Disco")) electronic.push(genre);
      if (genre.includes("Glitch")) electronic.push(genre);
      if (genre.includes("house")) electronic.push(genre);
      if (genre.includes("Breakbeat")) electronic.push(genre);
      if (genre.includes("R&B")) rnb.push(genre);
      if (genre.includes("Soul")) rnb.push(genre);
      if (genre.includes("MPB")) rnb.push(genre);
      if (genre.includes("Funk")) rnb.push(genre);
      if (genre.includes("Ambient")) ambient.push(genre);
      if (genre.includes("Drone")) ambient.push(genre);
      if (genre.includes("Musique concrète")) ambient.push(genre);
      if (genre.includes("Future Garage")) ambient.push(genre);
      if (genre.includes("Hi-Tech Psytrance")) ambient.push(genre);
      if (genre.includes("Darkwave")) ambient.push(genre);
      if (genre.includes("Noise")) ambient.push(genre);
      if (genre.includes("Tape Music")) ambient.push(genre);
      if (genre.includes("Collage")) ambient.push(genre);
      if (genre.includes("Flashcore")) ambient.push(genre);
      if (genre.includes("Classical")) classical.push(genre);
      if (genre.includes("Baroque Music")) classical.push(genre);
      if (genre.includes("Stochastic Music")) classical.push(genre);
      if (genre.includes("Neoclassical")) classical.push(genre);
      if (genre.includes("Chamber Music")) classical.push(genre);
      if (genre.includes("Romanticism")) classical.push(genre);
      if (genre.includes("Renaissance Music")) classical.push(genre);
      if (genre.includes("Spectralism")) classical.push(genre);
      if (genre.includes("Breakcore")) classical.push(genre);
      if (genre.includes("Choral")) classical.push(genre);
      if (genre.includes("Tone Poem")) classical.push(genre);
      if (genre.includes("Minimalism")) classical.push(genre);
      if (genre.includes("Field Recordings")) classical.push(genre);
      if (genre.includes("Orchestral")) classical.push(genre);
      if (genre.includes("Romantic")) classical.push(genre);
      else {
        others.push(genre);
      }
    };

    const svg = d3.select(ref.current);
    const height = ref.current.clientHeight;
    const width = ref.current.clientWidth;

    d3.json(albumsByCountry).then((data) => {
      if (albums.some((album) => album.country === country)) {
        let countryData = data.features.filter(
          (d) => d.properties.country === country
        );

        let x = d3
          .scaleLinear()
          .domain([0, countryData.length])
          .range([0, width]);
        countryData.map((d) => genreFilteredHandler(d.properties.genre[0]));

        country && svg.selectAll(".Metal").remove();
        country &&
          svg
            .append("rect")
            .attr("class", "Metal")
            .attr("width", x(pastMetalLength))
            .attr("height", height)
            .attr("x", x(0))
            .attr("y", 0)
            .attr("fill", genreColorGenerator("Metal"))
            .attr("opacity", 0.5)
            .on("mouseover", (e) => {
              let content = `Metal: ${metal.length}`;
              tooltip.html(content).style("visibility", "visible");
            })
            .on("mousemove", (e) => {
              tooltip
                .style(
                  "top",
                  e.pageY - (tooltip.node().clientHeight + 5) + "px"
                )
                .style(
                  "left",
                  e.pageX - tooltip.node().clientWidth / 2.0 + "px"
                );
            })
            .on("mouseout", (e) => {
              tooltip.style("visibility", "hidden");
            });

        country &&
          svg
            .selectAll(".Metal")
            .transition()
            .duration(1000)
            .attr("width", x(metal.length));

        country && svg.selectAll(".Rock").remove();
        country &&
          svg
            .append("rect")
            .attr("class", "Rock")
            .attr("width", x(pastRockLength))
            .attr("height", height)
            .attr("x", x(metal.length))
            .attr("y", 0)
            .attr("fill", genreColorGenerator("Rock"))
            .attr("opacity", 0.5)
            .on("mouseover", (e) => {
              let content = `Rock: ${rock.length}`;
              tooltip.html(content).style("visibility", "visible");
            })
            .on("mousemove", (e) => {
              tooltip
                .style(
                  "top",
                  e.pageY - (tooltip.node().clientHeight + 5) + "px"
                )
                .style(
                  "left",
                  e.pageX - tooltip.node().clientWidth / 2.0 + "px"
                );
            })
            .on("mouseout", (e) => {
              tooltip.style("visibility", "hidden");
            });
        country &&
          svg
            .selectAll(".Rock")
            .transition()
            .duration(1000)
            .delay(100)
            .attr("width", x(rock.length));

        country && svg.selectAll(".Pop").remove();
        country &&
          svg
            .append("rect")
            .attr("class", "Pop")
            .attr("width", x(pastPopLength))
            .attr("height", height)
            .attr("x", x(metal.length + rock.length))
            .attr("y", 0)
            .attr("fill", genreColorGenerator("Pop"))
            .attr("opacity", 0.5)
            .on("mouseover", (e) => {
              let content = `Pop: ${pop.length}`;
              tooltip.html(content).style("visibility", "visible");
            })
            .on("mousemove", (e) => {
              tooltip
                .style(
                  "top",
                  e.pageY - (tooltip.node().clientHeight + 5) + "px"
                )
                .style(
                  "left",
                  e.pageX - tooltip.node().clientWidth / 2.0 + "px"
                );
            })
            .on("mouseout", (e) => {
              tooltip.style("visibility", "hidden");
            });
        country &&
          svg
            .selectAll(".Pop")
            .transition()
            .duration(1000)
            .delay(200)
            .attr("width", x(pop.length));

        country && svg.selectAll(".Folk").remove();
        country &&
          svg
            .append("rect")
            .attr("class", "Folk")
            .attr("width", x(pastFolkLength))
            .attr("height", height)
            .attr("x", x(metal.length + rock.length + pop.length))
            .attr("y", 0)
            .attr("fill", genreColorGenerator("Folk"))
            .attr("opacity", 0.5)
            .on("mouseover", (e) => {
              let content = `Folk: ${folk.length}`;
              tooltip.html(content).style("visibility", "visible");
            })
            .on("mousemove", (e) => {
              tooltip
                .style(
                  "top",
                  e.pageY - (tooltip.node().clientHeight + 5) + "px"
                )
                .style(
                  "left",
                  e.pageX - tooltip.node().clientWidth / 2.0 + "px"
                );
            })
            .on("mouseout", (e) => {
              tooltip.style("visibility", "hidden");
            });
        country &&
          svg
            .selectAll(".Folk")
            .transition()
            .duration(1000)
            .delay(300)
            .attr("width", x(folk.length));

        country && svg.selectAll(".HipHop").remove();
        country &&
          svg
            .append("rect")
            .attr("class", "HipHop")
            .attr("width", x(pastHipHopLength))
            .attr("height", height)
            .attr("x", x(metal.length + rock.length + pop.length + folk.length))
            .attr("y", 0)
            .attr("fill", genreColorGenerator("Hip-Hop"))
            .attr("opacity", 0.5)
            .on("mouseover", (e) => {
              let content = `HipHop: ${hip_hop.length}`;
              tooltip.html(content).style("visibility", "visible");
            })
            .on("mousemove", (e) => {
              tooltip
                .style(
                  "top",
                  e.pageY - (tooltip.node().clientHeight + 5) + "px"
                )
                .style(
                  "left",
                  e.pageX - tooltip.node().clientWidth / 2.0 + "px"
                );
            })
            .on("mouseout", (e) => {
              tooltip.style("visibility", "hidden");
            });

        country &&
          svg
            .selectAll(".HipHop")
            .transition()
            .duration(1000)
            .delay(400)
            .attr("width", x(hip_hop.length));

        country && svg.selectAll(".Jazz").remove();
        country &&
          svg
            .append("rect")
            .attr("class", "Jazz")
            .attr("width", x(pastJazzLength))
            .attr("height", "480px")
            .attr(
              "x",
              x(
                metal.length +
                  rock.length +
                  pop.length +
                  folk.length +
                  hip_hop.length
              )
            )
            .attr("y", 0)
            .attr("fill", genreColorGenerator("Jazz"))
            .attr("opacity", 0.5)
            .on("mouseover", (e) => {
              let content = `Jazz: ${jazz.length}`;
              tooltip.html(content).style("visibility", "visible");
            })
            .on("mousemove", (e) => {
              tooltip
                .style(
                  "top",
                  e.pageY - (tooltip.node().clientHeight + 5) + "px"
                )
                .style(
                  "left",
                  e.pageX - tooltip.node().clientWidth / 2.0 + "px"
                );
            })
            .on("mouseout", (e) => {
              tooltip.style("visibility", "hidden");
            });

        country &&
          svg
            .selectAll(".Jazz")
            .transition()
            .duration(1000)
            .delay(500)
            .attr("width", x(jazz.length));

        country && svg.selectAll(".Electronic").remove();
        country &&
          svg
            .append("rect")
            .attr("class", "Electronic")
            .attr("width", x(pastElectronicLength))
            .attr("height", height)
            .attr(
              "x",
              x(
                metal.length +
                  rock.length +
                  pop.length +
                  folk.length +
                  hip_hop.length +
                  jazz.length
              )
            )
            .attr("y", 0)
            .attr("fill", genreColorGenerator("Electronic"))
            .attr("opacity", 0.5)
            .on("mouseover", (e) => {
              let content = `Electronic: ${electronic.length}`;
              tooltip.html(content).style("visibility", "visible");
            })
            .on("mousemove", (e) => {
              tooltip
                .style(
                  "top",
                  e.pageY - (tooltip.node().clientHeight + 5) + "px"
                )
                .style(
                  "left",
                  e.pageX - tooltip.node().clientWidth / 2.0 + "px"
                );
            })
            .on("mouseout", (e) => {
              tooltip.style("visibility", "hidden");
            });

        country &&
          svg
            .selectAll(".Electronic")
            .transition()
            .duration(1000)
            .delay(600)
            .attr("width", x(electronic.length));

        country && svg.selectAll(".Ambient").remove();
        country &&
          svg
            .append("rect")
            .attr("class", "Ambient")
            .attr("width", x(pastAmbientLength))
            .attr("height", height)
            .attr(
              "x",
              x(
                metal.length +
                  rock.length +
                  pop.length +
                  folk.length +
                  hip_hop.length +
                  jazz.length +
                  electronic.length
              )
            )
            .attr("y", 0)
            .attr("fill", genreColorGenerator("Ambient"))
            .attr("opacity", 0.5)
            .on("mouseover", (e) => {
              let content = `Ambient: ${ambient.length}`;
              tooltip.html(content).style("visibility", "visible");
            })
            .on("mousemove", (e) => {
              tooltip
                .style(
                  "top",
                  e.pageY - (tooltip.node().clientHeight + 5) + "px"
                )
                .style(
                  "left",
                  e.pageX - tooltip.node().clientWidth / 2.0 + "px"
                );
            })
            .on("mouseout", (e) => {
              tooltip.style("visibility", "hidden");
            });

        country &&
          svg
            .selectAll(".Ambient")
            .transition()
            .duration(1000)
            .delay(700)
            .attr("width", x(ambient.length));

        country && svg.selectAll(".RnB").remove();
        country &&
          svg
            .append("rect")
            .attr("class", "RnB")
            .attr("width", x(pastRnBLength))
            .attr("height", height)
            .attr(
              "x",
              x(
                metal.length +
                  rock.length +
                  pop.length +
                  folk.length +
                  hip_hop.length +
                  jazz.length +
                  electronic.length +
                  ambient.length
              )
            )
            .attr("y", 0)
            .attr("fill", genreColorGenerator("RnB"))
            .attr("opacity", 0.5)
            .on("mouseover", (e) => {
              let content = `RnB: ${rnb.length}`;
              tooltip.html(content).style("visibility", "visible");
            })
            .on("mousemove", (e) => {
              tooltip
                .style(
                  "top",
                  e.pageY - (tooltip.node().clientHeight + 5) + "px"
                )
                .style(
                  "left",
                  e.pageX - tooltip.node().clientWidth / 2.0 + "px"
                );
            })
            .on("mouseout", (e) => {
              tooltip.style("visibility", "hidden");
            });

        country &&
          svg
            .selectAll(".RnB")
            .transition()
            .duration(1000)
            .delay(800)
            .attr("width", x(rnb.length));

        country && svg.selectAll(".Classical").remove();
        country &&
          svg
            .append("rect")
            .attr("class", "Classical")
            .attr("width", x(pastClassicalLength))
            .attr("height", height)
            .attr(
              "x",
              x(
                metal.length +
                  rock.length +
                  pop.length +
                  folk.length +
                  hip_hop.length +
                  jazz.length +
                  electronic.length +
                  ambient.length +
                  rnb.length +
                  classical.length
              )
            )
            .attr("y", 0)
            .attr("fill", genreColorGenerator("Classical"))
            .attr("opacity", 0.5)
            .on("mouseover", (e) => {
              let content = `Classical: ${classical.length}`;
              tooltip.html(content).style("visibility", "visible");
            })
            .on("mousemove", (e) => {
              tooltip
                .style(
                  "top",
                  e.pageY - (tooltip.node().clientHeight + 5) + "px"
                )
                .style(
                  "left",
                  e.pageX - tooltip.node().clientWidth / 2.0 + "px"
                );
            })
            .on("mouseout", (e) => {
              tooltip.style("visibility", "hidden");
            });

        country &&
          svg
            .selectAll(".Classical")
            .transition()
            .duration(1000)
            .delay(900)
            .attr("width", x(classical.length));

        pastMetalLength = metal.length;
        pastRockLength = rock.length;
        pastPopLength = pop.length;
        pastFolkLength = folk.length;
        pastHipHopLength = hip_hop.length;
        pastJazzLength = jazz.length;
        pastElectronicLength = electronic.length;
        pastAmbientLength = ambient.length;
        pastRnBLength = rnb.length;
        pastClassicalLength = classical.length;
      } else {
        svg.selectAll(".Metal").remove();
        svg.selectAll(".Pop").remove();
        svg.selectAll(".Rock").remove();
        svg.selectAll(".HipHop").remove();
        svg.selectAll(".Folk").remove();
        svg.selectAll(".Pop").remove();
        svg.selectAll(".Jazz").remove();
        svg.selectAll(".Electronic").remove();
        svg.selectAll(".Ambient").remove();
        svg.selectAll(".RnB").remove();
        svg.selectAll(".Classical").remove();
      }
    });
  });

  return <svg className="h-full w-full" ref={ref}></svg>;
};

export default GenreProportion;
