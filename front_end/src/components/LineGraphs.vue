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
  margins = {"top": 20, "bottom": 30, "left": 50, "right": 20};

  drawGraph(data) {
    if (!data) return;
    const height = 250 - this.margins.top - this.margins.bottom;
    const width = 280 - this.margins.left - this.margins.right;
    const svg = d3.select(".line-graphs")
        .append("svg")
        .attr("width", width + this.margins.left + this.margins.right)
        .attr("height", height + this.margins.top + this.margins.bottom);
    const g = svg.append("g")
        .attr("transform", "translate(" + this.margins.left + "," + this.margins.top + ")");
    const validKeys = Object.keys(data[this.index]).slice(170,300)
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
      .call(xaxis)
    .selectAll("text")
        .attr("y", 0)
        .attr("x", 9)
        .attr("dy", ".35em")
        .attr("transform", "rotate(90)")
        .style("text-anchor", "start");

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
      if (!state.data) return;
      console.log(state.data);
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
         font-size: smaller;
         font-family:"Arial Black", Gadget, sans-serif;
     } 

     .legend text{
         fill:  black;
         font-family:"Arial Black", Gadget, sans-serif;
     }
</style>
