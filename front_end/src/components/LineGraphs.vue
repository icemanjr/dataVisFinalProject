<template>
  <div class="line-graphs">
    <div :id="`line-graph-buy0`"></div>
    <div :id="`line-graph-rent0`"></div>
    <div :id="`line-graph-buy1`"></div>
    <div :id="`line-graph-rent1`"></div>
    <div :id="`line-graph-buy2`"></div>
    <div :id="`line-graph-rent2`"></div>
    <div :id="`line-graph-buy3`"></div>
    <div :id="`line-graph-rent3`"></div>
    <div :id="`line-graph-buy4`"></div>
    <div :id="`line-graph-rent4`"></div>
    <div :id="`line-graph-buy5`"></div>
    <div :id="`line-graph-rent5`"></div>
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
  margins = {"top": 20, "bottom": 50, "left": 50, "right": 20}

  drawGraph(data, selectedState) {
    if (!data) return;

    function stateFilter(dat){
      return dat.RegionName === selectedState;
    }
    const buyAvg = data["all_homes"].filter(stateFilter);
    const buy1 = data["one_bed"].filter(stateFilter);
    const buy2 = data["two_bed"].filter(stateFilter);
    const buy3 = data["three_bed"].filter(stateFilter);
    const buy4 = data["four_bed"].filter(stateFilter);
    const buy5 = data["five_plus_bed"].filter(stateFilter);
    const buy = [buyAvg[0], buy1[0], buy2[0], buy3[0], buy4[0], buy5[0]];

    const rentAvg = data["all_homes_rental"].filter(stateFilter);
    const rent1 = data["one_bed_rental"].filter(stateFilter);
    const rent2 = data["two_bed_rental"].filter(stateFilter);
    const rent3 = data["three_bed_rental"].filter(stateFilter);
    const rent4 = data["four_bed_rental"].filter(stateFilter);
    const rent5 = data["five_plus_bed_rental"].filter(stateFilter);
    const rent = [rentAvg[0], rent1[0], rent2[0], rent3[0], rent4[0], rent5[0]];

    const width = d3.select(".line-graphs").node().getBoundingClientRect().width;
    const height = d3.select(".line-graphs").node().getBoundingClientRect().height;
    const graphWidth = width/4 - this.margins.left - this.margins.right;
    const graphHeight = height/3 - this.margins.top - this.margins.bottom;

    const validKeysBuy = Object.keys(buyAvg[0]).slice(188, 295)
    const validKeysRent = Object.keys(rentAvg[0]).slice(188, 295)
    console.log(validKeysBuy);
    console.log(validKeysRent);
    let maxBuy = 0;
    let maxRent = 0;
    let minBuy = Infinity;
    let minRent = Infinity;
    let temp = 0;
    for (let i=0; i<6; i++) {
      temp = Math.max(Object.values(buy[i]).slice(175, 295));
      if (maxBuy < temp) {
        maxBuy = temp;
      }
      if (minBuy > temp) {
        minBuy = temp;
      }
    }
    for (let i=0; i<6; i++) {
      temp = Math.max(Object.values(rent[i]).slice(175, 297));
      if (maxRent < temp) {
        maxRent = temp;
      }
      if (minRent > temp) {
        minRent = temp;
      }
    }

    function  getYValueBuy(key, idx) {
      return parseFloat(buy[idx][0][key]);
    }

    function getYValueRent(key, idx) {
      return parseFloat(rent[idx][0][key]);
    }

    const formatDate = key => {
      const splitDate = key.split("-")
      return new Date(splitDate[0], splitDate[1] - 1, splitDate[2])
    }

    const xScaleBuy = d3.scaleTime()
        .range([0, graphWidth])
        .domain(d3.extent(validKeysBuy, key => {
          return formatDate(key)
        }));

    const yScaleBuy = d3.scaleLinear()
        .range([graphHeight, 0])
        .domain([0, maxBuy]);

    const xScaleRent = d3.scaleTime()
        .range([0, graphWidth])
        .domain(d3.extent(validKeysBuy, key => {
          return formatDate(key)
        }));

    const yScaleRent = d3.scaleLinear()
        .range([graphHeight, 0])
        .domain([0, maxRent]);

    const lineFuncBuy = d3.line()
        .x(key => {
          return xScaleBuy(formatDate(key))
        })
        .y((key, idx) => {
          return yScaleBuy(getYValueBuy(key, idx))
        })

    const lineFuncRent = d3.line()
        .x(key => {
          return xScaleRent(formatDate(key))
        })
        .y((key, idx) => {
          return yScaleRent(getYValueRent(key, idx))
        })

    for (let i=0; i<6; i++) {
      let svgBuy = d3.select(`#line-graph-buy${i}`)
          .append("svg")
          .attr("width", graphWidth)
          .attr("height", graphHeight);

      let gBuy = svgBuy.append("g")
          .attr("transform", "translate(" + this.margins.left + "," + this.margins.top + ")");

      let yaxisBuy = d3.axisLeft().scale(yScaleBuy).ticks(5);
      let xaxisBuy = d3.axisBottom().scale(xScaleBuy);

      gBuy.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xaxisBuy)
        .selectAll("text")
        .attr("y", 0)
        .attr("x", 9)
        .attr("dy", ".35em")
        .attr("transform", "rotate(90)")
        .style("text-anchor", "start");

      gBuy.append("g")
        .attr("class", "axis")
        .call(yaxisBuy);

      gBuy.append('svg:path')
        .attr("d", lineFuncBuy(validKeysBuy))
        .attr('stroke', 'black')
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        .attr("id", "line")
        .style("z-index", "0")
        .on("mouseover", function (d, e) {
          console.log(this, d, e)
        });

      gBuy.append("text")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", 0)
        .style("font-family", "calibri")
        .text(data.RegionName);

      let svgRent = d3.selectAll(`#line-graph-rent${i}`)
          .append("svg")
          .attr("width", graphWidth)
          .attr("height", graphHeight);

      let gRent = svgRent.append("g")
        .attr("transform", "translate(" + this.margins.left + "," + this.margins.top + ")");

      let yaxisRent = d3.axisLeft().scale(yScaleRent).ticks(5);
      let xaxisRent = d3.axisBottom().scale(xScaleRent);

      gRent.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xaxisRent)
        .selectAll("text")
        .attr("y", 0)
        .attr("x", 9)
        .attr("dy", ".35em")
        .attr("transform", "rotate(90)")
        .style("text-anchor", "start");

      gRent.append("g")
        .attr("class", "axis")
        .call(yaxisRent);

      gRent.append('svg:path')
        .attr("d", lineFuncRent(validKeysRent))
        .attr('stroke', 'black')
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        .attr("id", "line")
        .style("z-index", "0")
        .on("mouseover", function (d, e) {
          console.log(this, d, e)
        });

      gRent.append("text")
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
     return this.drawGraph(state.data, state.selectedState)
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
