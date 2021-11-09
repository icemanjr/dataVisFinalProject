<template>
  <div class="line-graphs">
    Line Graphs
    <div class="graph"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "@/utils/vue-imports";
import * as d3 from "d3";

type Data = {
  year: number,
  media: string,
  spending: number
  }
@Component({
  name: "LineGraphs",
  components: {},
})
export default class LineGraphs extends Vue {
  mounted() {
    const margin = {top: 10, right: 30, bottom: 30, left: 60};
    const width = 460 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    const svg = d3.select('.graph').append('svg').attr("width", width + margin.left + margin.right) .attr("height", height + margin.top + margin.bottom) .append("g") .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    const data: Data[] = [
    { year: 2016, media: "Digital", spending: 72.2 },
    { year: 2017, media: "Digital", spending: 90.39 },
    { year: 2018, media: "Digital", spending: 107.3 },
    { year: 2019, media: "Digital", spending: 125.75 },
    { year: 2020, media: "Digital", spending: 142.23 },
    { year: 2021, media: "Digital", spending: 156.43 },
    { year: 2022, media: "Digital", spending: 170.48 },
    ]
    const parseTime = d3.timeParse("%Y")
    data.forEach((d: Data) => {
      d.year = parseTime(d.year)
    })
    const xExtent = d3.extent(data, (d: Data) => d.year);
    const xScale = d3.scaleTime().domain(xExtent).range([margin.left, 900])
    const yMax=d3.max(data,(d: Data)=>d.spending)
    const yScale = d3.scaleLinear().domain([0, yMax+margin.top]).range([600, 0])

    const xAxis = d3.axisBottom().scale(xScale)
    d3.select("svg")
    .append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0,620)")
    .call(xAxis)
    .append("text")
    .attr("x", (900+70)/2) //middle of the xAxis
    .attr("y", "50") // a little bit below xAxis
    .text("Year")

    const yAxis = d3.axisLeft()
    .scale(yScale)
    .ticks(10)

    d3.select('svg')
        .append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${margin.left},20)`) //use variable in translate
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", "-150")
        .attr("y", "-50")
        .attr("text-anchor", "end")
        .text("US Media Ad Spending (Billions)")


//set color pallete for different vairables

//select path - three types: curveBasis,curveStep, curveCardinal
d3.select("svg")
    .selectAll(".line")
    .append("g")
    .attr("class", "line")
    .data(data)
    .enter()
    .append("path")
    .attr("d", function (d: Data) {
        return d3.line()
            .x((d: Data) => xScale(d.year))
            .y((d: Data) => yScale(d.spending)).curve(d3.curveCardinal)
    })
    .attr("fill", "red")
    .attr("stroke", () => "red")
    .attr("stroke-width", 2)


//append circle 
d3.select("svg")
    .selectAll("circle")
    .append("g")
    .data(data)
    .enter()
    .append("circle")
    .attr("r", 6)
    .attr("cx", (d: Data) => xScale(d.year))
    .attr("cy", (d: Data) => yScale(d.spending))

  }
}
</script>

<style lang="scss">
@import "@/assets/css/styles.scss";
.line-graphs {
  @include component;
  background-color: lightblue;
}
.axis path{
         stroke:black;
         stroke-width:2px ;
     }   

     .axis line{
         stroke: black;
         stroke-width: 1.5px;
     } 
  
     .axis text{
         fill: black;
         font-weight: bold;
         font-size: 14px;
         font-family:"Arial Black", Gadget, sans-serif;
     } 

     .legend text{
         fill:  black;
         font-family:"Arial Black", Gadget, sans-serif;
     }
</style>
