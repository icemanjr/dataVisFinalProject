<template>
    <div :id="`line-graph${index}`"></div>
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
  margins = {"top": 20, "bottom": 50, "left": 50, "right": 20}

  drawGraph(data) {
    if (!data) return;
    if (!this.$store.state.selectedState) return;

    function stateFilter(dat){
      return dat.RegionName === this.$store.state.selectedState;
    }
    const buyAvg = data["all_homes"].filter(stateFilter);
    const buy1 = data["one_bed"].filter(stateFilter);
    const buy2 = data["two_bed"].filter(stateFilter);
    const buy3 = data["three_bed"].filter(stateFilter);
    const buy4 = data["four_bed"].filter(stateFilter);
    const buy5 = data["five_plus_bed"].filter(stateFilter);

    const rentAvg = data["all_homes_rental"].filter(stateFilter);
    const rent1 = data["one_bed_rental"].filter(stateFilter);
    const rent2 = data["two_bed_rental"].filter(stateFilter);
    const rent3 = data["three_bed_rental"].filter(stateFilter);
    const rent4 = data["four_bed_rental"].filter(stateFilter);
    const rent5 = data["five_plus_bed_rental"].filter(stateFilter);

    const width = d3.select(".line-graphs").node().getBoundingClientRect().width;
    const height = d3.select(".line-graphs").node().getBoundingClientRect().height;
    const graphWidth = width/4 - this.margins.left - this.margins.right;
    const graphHeight = height/3 - this.margins.top - this.margins.bottom;

    const validKeys = Object.keys(buyAvg).slice(170, 300)
    console.log(validKeys);


    const formatDate = key => {
      const splitDate = key.split("-")
      return new Date(splitDate[0], splitDate[1] - 1, splitDate[2])
    }
    const getYValue = key => parseFloat(data[key])

    const xScaleBuy = d3.scaleTime()
        .range([0, width])
        .domain(d3.extent(validKeys, key => {
          return formatDate(key)
        }));

    const yScaleBuy = d3.scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(validKeys, key => {
          return getYValue(key)
        })]);

    const xScaleRent = d3.scaleTime()
        .range([0, width])
        .domain(d3.extent(validKeys, key => {
          return formatDate(key)
        }));

    const yScaleRent = d3.scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(validKeys, key => {
          return getYValue(key)
        })]);

    const lineFuncBuy = d3.line()
        .x(key => {
          return xScaleBuy(formatDate(key))
        })
        .y(key => {
          return yScaleBuy(getYValue(key))
        })

    const lineFuncRent = d3.line()
        .x(key => {
          return xScaleRent(formatDate(key))
        })
        .y(key => {
          return yScaleRent(getYValue(key))
        })

    for (let i=0; i<6; i++) {
      const svg = d3.select(`.line-graph`)
          .append("svg")
          .attr("width", graphWidth)
          .attr("height", graphHeight);

      const g = svg.append("g")
          .attr("transform", "translate(" + this.margins.left + "," + this.margins.top + ")");

      const yaxis = d3.axisLeft().scale(yScaleBuy).ticks(5);
      const xaxis = d3.axisBottom().scale(xScaleBuy);

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
          .attr("d", lineFuncBuy(validKeys))
          .attr('stroke', 'black')
          .attr('stroke-width', 2)
          .attr('fill', 'none')
          .attr("id", "line")
          .style("z-index", "0")
          .on("mouseover", function (d, e) {
            console.log(this, d, e)
          });

      g.append("text")
          .attr("text-anchor", "end")
          .attr("x", width)
          .attr("y", 0)
          .style("font-family", "calibri")
          .text(data.RegionName);
    }
  }
  
  mounted() {
    this.$store.watch((state) =>{
      if (!state.data) return;
     return this.drawGraph(state.data)
    })
  }
}
</script>

<style lang="scss">
@import "@/assets/css/styles.scss";
.line-graphs {
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
</style>
