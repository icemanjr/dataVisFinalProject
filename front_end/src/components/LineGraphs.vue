<template>
  <div class="line-graphs">
    <div id="line-graph"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "@/utils/vue-imports";
import * as d3 from "d3";

@Component({
  name: "LineGraphs",
  components: {},
})
export default class LineGraphs extends Vue {
  @Prop() index!: number;
  data = () => this.$store.state.data
  margins = 200

  drawGraph(data) {
    if (!data) return;
    const svg = d3.select("#line-graph").append("svg").attr("width", "600").attr("height", "400");
    const g = svg.append("g").attr("transform", "translate(" + 100 + "," + 100 + ")");
    const width = svg.attr("width") - this.margins;
    const height = svg.attr("height") - this.margins;
    const validKeys = Object.keys(data[this.index]).slice(10,200)
    const formatDate = key => {
      const splitDate = key.split("-")
      return new Date(splitDate[0], splitDate[1]-1, splitDate[2])
    }
    const getYValue = key => parseFloat(data[this.index][key])

    const xScale = d3.scaleTime()
      .range([0,width])
      .domain(d3.extent(validKeys, key => {
        return formatDate(key) }));

    const yScale = d3.scaleLinear()
      .range([height, 0])
      .domain([0,d3.max(validKeys, key => {
        return getYValue(key)
      })]);

    const lineFunc = d3.line()
      .x(key => {
        return xScale(formatDate(key))
      })
      .y(key => {
        return yScale(getYValue(key))
      })

    const yaxis = d3.axisLeft().scale(yScale); 
    const xaxis = d3.axisBottom().scale(xScale);


    g.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xaxis);

    g.append("g")
        .attr("class", "axis")
        .call(yaxis);

    g.append('svg:path')
      .attr("d", lineFunc(validKeys))
      .attr('stroke', 'black')
      .attr('stroke-width', 2)
      .attr('fill', 'none')
      .attr("id", "line")
      .style("z-index", "0")
      .on("mouseover", function(d, e) {
        console.log(this, d, e)
      }) ;

    g.append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", 0) 
      .style("font-family", "calibri")
      .text(data[this.index].RegionName);




      
    



    





  }
  
  mounted() {
    this.$store.watch((state) =>{
     return this.drawGraph(state.data["all_homes"])
    })
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
