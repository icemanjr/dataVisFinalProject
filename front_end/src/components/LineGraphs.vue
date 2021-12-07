<template>
    <div :id="`line-graph${index}`" class="line-graph"></div>
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
  @Prop() maxValue!: Function;
  @Prop() category!: string;
  @Prop() title!: string;
  data = () => this.$store.state.data
  margins = {"top": 15, "bottom": 50, "left": 70, "right": 5}
  unwatch = null;

  drawGraph(data, selectedState) {
    if (!data) return;

    function stateFilter(dat){
      return dat.state === selectedState;
    }
    const filtered_data = data[this.category].filter(d => stateFilter(d))[0].data;
    const filtered_data_keys = Object.keys(filtered_data)
    const width = d3.select (`#line-graph${this.index}`).node().getBoundingClientRect().width;
    const height = d3.select(`#line-graph${this.index}`).node().getBoundingClientRect().height;
    const graphWidth = width/1.2 - this.margins.left - this.margins.right;
    const graphHeight = height/1.2 - this.margins.top - this.margins.bottom;
    const getYValue = (key) => filtered_data[key];

    const formatDate = key => {
      const splitDate = key.split("-")
      return new Date(splitDate[0], splitDate[1] - 1)
    }
    const xScale = d3.scaleTime()
        .range([0, graphWidth])
        .domain(d3.extent(Object.keys(filtered_data), key => {
          return formatDate(key)
        }));

    const yScale = d3.scaleLinear()
        .range([graphHeight, 0])
        .domain([0, this.maxValue()]);
    const lineFunc = d3.line()
        .x(key => {
          return xScale(formatDate(key))
        })
        .y((key) => {
          return yScale(getYValue(key))
        });
    const svg = d3.select(`#line-graph${this.index}`)
      .append("svg")
      .attr("width", graphWidth + this.margins.left + this.margins.right)
      .attr("height", graphHeight + this.margins.top + this.margins.bottom);

    svg.append("text")
        .text(`${this.title}`)
        .attr("class", "title")
        .attr("x", (this.margins.left + graphWidth/2))
        .attr("y", 15);

    const g = svg.append("g")
      .attr("transform", "translate(" + this.margins.left + "," + this.margins.top + ")");

    const yAxis = d3.axisLeft().scale(yScale).ticks(5);
    const xAxis = d3.axisBottom().scale(xScale);
    g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + graphHeight + ")")
      .call(xAxis)
      .selectAll("text")
      .attr("y", 0)
      .attr("x", 9)
      .attr("dy", ".35em")
      .attr("transform", "rotate(90)")
      .style("text-anchor", "start");

    g.append("g")
      .attr("class", "axis")
      .attr("id", `axis${this.index}`)
      .call(yAxis);

    g.append('svg:path')
      .attr("id", `path${this.index}`)
      .attr("d", lineFunc(filtered_data_keys))
      .attr('stroke', 'black')
      .attr("stroke-width", 2)
      .attr("fill", "none");
  }
  updateGraph(data, selectedState) {
    console.log('updating graph')
    function stateFilter(dat){
      return dat.state === selectedState;
    }
    const filtered_data = data[this.category].filter(d => stateFilter(d))[0].data;
    const filtered_data_keys = Object.keys(filtered_data)
    const width = d3.select (`#line-graph${this.index}`).node().getBoundingClientRect().width;
    const height = d3.select(`#line-graph${this.index}`).node().getBoundingClientRect().height;
    const graphWidth = width/1.2 - this.margins.left - this.margins.right;
    const graphHeight = height/1.2 - this.margins.top - this.margins.bottom;
    const getYValue = (key) => filtered_data[key];

    const formatDate = key => {
      const splitDate = key.split("-")
      return new Date(splitDate[0], splitDate[1] - 1)
    }
    const xScale = d3.scaleTime()
        .range([0, graphWidth])
        .domain(d3.extent(Object.keys(filtered_data), key => {
          return formatDate(key)
        }));

    const yScale = d3.scaleLinear()
        .range([graphHeight, 0])
        .domain([0, this.maxValue()]);
    const lineFunc = d3.line()
        .x(key => {
          return xScale(formatDate(key))
        })
        .y((key) => {
          return yScale(getYValue(key))
        });

    const yAxis = d3.axisLeft().scale(yScale).ticks(5);
    d3.select(`#axis${this.index}`)
        .call(yAxis);

    d3.select(`#path${this.index}`)
        .attr("d", lineFunc(filtered_data_keys))
        .attr('stroke', 'black')
        .attr("stroke-width", 2)
        .attr("fill", "none");
  }
  
  mounted() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      console.log(mutation,state)
      if (mutation.type === "changeSelectedState") {
        this.updateGraph(state, state.selectedState)
      }

    })
    const unwatch = this.$store.watch((state) =>{
      if (!state.data) return;
      this.drawGraph(state.data, state.selectedState)
      this.unwatch()
    })
    this.unwatch = unwatch
  }
}
</script>

<style lang="scss">
@import "@/assets/css/styles.scss";
.line-graph {
  @include component;
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
.axis {
  text {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 12px;
    font-weight: normal;
  }
}
.title {
  fill:  black;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 12px;
  font-weight: normal;
  text-anchor: middle;
}

</style>
