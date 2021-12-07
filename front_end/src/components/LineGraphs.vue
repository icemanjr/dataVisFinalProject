<template>
    <div :id="`line-graph${index}`" class="line-graph">{{ index }}</div>
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
  data = () => this.$store.state.data
  margins = {"top": 15, "bottom": 50, "left": 70, "right": 5}
  unwatch = null;

  drawGraph(data, selectedState) {
    if (!data) return;

    function stateFilter(dat){
      return dat.RegionName === selectedState;
    }
    const filtered_data = data[this.category].filter(d => stateFilter(d))[0]


    // const buyAvg = data["all_homes"].filter(stateFilter);
    // const buy1 = data["one_bed"].filter(stateFilter);
    // const buy2 = data["two_bed"].filter(stateFilter);
    // const buy3 = data["three_bed"].filter(stateFilter);
    // const buy4 = data["four_bed"].filter(stateFilter);
    // const buy5 = data["five_plus_bed"].filter(stateFilter);
    // const buy = [buyAvg[0], buy1[0], buy2[0], buy3[0], buy4[0], buy5[0]];

    // const rentAvg = data["all_homes_rental"].filter(stateFilter);
    // const rent1 = data["one_bed_rental"].filter(stateFilter);
    // const rent2 = data["two_bed_rental"].filter(stateFilter);
    // const rent3 = data["three_bed_rental"].filter(stateFilter);
    // const rent4 = data["four_bed_rental"].filter(stateFilter);
    // const rent5 = data["five_plus_bed_rental"].filter(stateFilter);
    // const rent = [rentAvg[0], rent1[0], rent2[0], rent3[0], rent4[0], rent5[0]];

    const width = d3.select (`#line-graph${this.index}`).node().getBoundingClientRect().width;
    const height = d3.select(`#line-graph${this.index}`).node().getBoundingClientRect().height;
    const graphWidth = width/1.2 - this.margins.left - this.margins.right;
    const graphHeight = height/1.2 - this.margins.top - this.margins.bottom;
    
    // const titlesBuy = ["Buy Average", "Buy 1 Bedroom", "Buy 2 Bedroom", "Buy 3 Bedroom", "Buy 4 Bedroom", "Buy 5+ Bedroom"]
    // const titlesRent = ["Rent Average", "Rent 1 Bedroom", "Rent 2 Bedroom", "Rent 3 Bedroom", "Rent 4 Bedroom", "Rent 5+ Bedroom"]

    const startIndex = 188;
    const endIndex = 295;

    // const validKeysBuy = Object.keys(buyAvg[0]).slice(startIndex, endIndex);
    // const validKeysRent = Object.keys(rentAvg[0]).slice(startIndex, endIndex);

    // let maxBuy = 0;
    // let maxRent = 0;
    // let tempMax;
    // for (let i=0; i<6; i++) {
    //   tempMax = Object.values(buy[i]).slice(startIndex, endIndex).map(Number).reduce(function(a,b){return Math.max(a,b)});
    //   if (maxBuy < tempMax) {
    //     maxBuy = tempMax;
    //   }
    // }
    // for (let i=0; i<6; i++) {
    //   tempMax = Object.values(rent[i]).slice(startIndex, endIndex).map(Number).reduce(function(a,b){return Math.max(a,b)})
    //   if (maxRent < tempMax) {
    //     maxRent = tempMax;
    //   }
    // }

    // function  getYValueBuy(key, idx) {
    //   return +buy[idx][key];
    // }

    // function getYValueRent(key, idx) {
    //   return +rent[idx][key];
    // }

    const getYValue = (key) => filtered_data[key];

    const formatDate = key => {
      const splitDate = key.split("-")
      return new Date(splitDate[0], splitDate[1] - 1, splitDate[2])
    }

    //...

    const xScale = d3.scaleTime()
        .range([0, graphWidth])
        .domain(d3.extent(Object.keys(filtered_data), key => {
          console.log(key)
          return formatDate(key)
        }));

    const yScale = d3.scaleLinear()
        .range([graphHeight, 0])
        .domain([0, this.maxValue()]);



    const lineFuncBuy = d3.line()
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
      .call(yAxis);

//...
    // const buy0LineFunc = d3.line()
    //   .x(key => {
    //     console.log(xAxisBuy(formatDate(key)))
    //     console.log(key, formatDate(key))
    //     const r =  xAxisBuy(formatDate(key))
    //     console.log(r)
    //     return r
    //   })
    //   .y(key => {
    //     console.log(key)
    //     const r =  yAxisBuy(getYValueBuy0(key))
    //     return r
    //   })

    
    // gBuy.append('svg:path')
    //   .attr("d", buy0LineFunc(buy0Keys))
    //   .attr('stroke', 'black')
    //   .attr("stroke-width", 2)


    // for (let i=0; i<6; i++) {
    //   let svgBuy = d3.select(`#line-graph-buy${i}`)
    //       .append("svg")
    //       .attr("width", graphWidth + this.margins.left + this.margins.right)
    //       .attr("height", graphHeight + this.margins.top + this.margins.bottom);

    //   let gBuy = svgBuy.append("g")
    //       .attr("transform", "translate(" + this.margins.left + "," + this.margins.top + ")");

    //   let yaxisBuy = d3.axisLeft().scale(yScaleBuy).ticks(5);
    //   let xaxisBuy = d3.axisBottom().scale(xScaleBuy);

    //   gBuy.append("g")
    //     .attr("class", "axis")
    //     .attr("transform", "translate(0," + graphHeight + ")")
    //     .call(xaxisBuy)
    //     .selectAll("text")
    //     .attr("y", 0)
    //     .attr("x", 9)
    //     .attr("dy", ".35em")
    //     .attr("transform", "rotate(90)")
    //     .style("text-anchor", "start");

    //   gBuy.append("g")
    //     .attr("class", "axis")
    //     .call(yaxisBuy);

    //   console.log(buy[i])

    //   gBuy.append('svg:path')
    //     .data(buy[i])
    //     // .attr("d", lineFuncBuy({key: validKeysBuy, idx: i}))
    //     .attr("d", d => {
    //       console.log(d)
    //       return 10
    //     })
    //     .attr('stroke', 'black')
    //     .attr('stroke-width', 2)
    //     .attr('fill', 'none')
    //     .attr("id", "line")
    //     .style("z-index", "0")
    //     .on("mouseover", function (d, e) {
    //       console.log(this, d, e)
    //     });

    //   gBuy.append("text")
    //     .attr("text-anchor", "middle")
    //     .attr("x", graphWidth/2)
    //     .attr("y", 0)
    //     .style("font-family", "calibri")
    //     .text(`${selectedState} ${titlesBuy[i]}`);

    //   let svgRent = d3.selectAll(`#line-graph-rent${i}`)
    //       .append("svg")
    //       .attr("width", graphWidth + this.margins.left + this.margins.right)
    //       .attr("height", graphHeight + this.margins.top + this.margins.bottom);

    //   let gRent = svgRent.append("g")
    //     .attr("transform", "translate(" + this.margins.left + "," + this.margins.top + ")");

    //   let yaxisRent = d3.axisLeft().scale(yScaleRent).ticks(5);
    //   let xaxisRent = d3.axisBottom().scale(xScaleRent);

    //   gRent.append("g")
    //     .attr("class", "axis")
    //     .attr("transform", "translate(0," + graphHeight + ")")
    //     .call(xaxisRent)
    //     .selectAll("text")
    //     .attr("y", 0)
    //     .attr("x", 9)
    //     .attr("dy", ".35em")
    //     .attr("transform", "rotate(90)")
    //     .style("text-anchor", "start");

    //   gRent.append("g")
    //     .attr("class", "axis")
    //     .call(yaxisRent);

    //   gRent.append('svg:path')
    //     .attr("d", lineFuncRent({key: validKeysRent, idx: i}))
    //     .attr('stroke', 'black')
    //     .attr('stroke-width', 2)
    //     .attr('fill', 'none')
    //     .attr("id", "line")
    //     .style("z-index", "0")
    //     .on("mouseover", function (d, e) {
    //       console.log(this, d, e)
    //     });

    //   gRent.append("text")
    //     .attr("text-anchor", "middle")
    //     .attr("x", graphWidth/2)
    //     .attr("y", 0)
    //     .style("font-family", "calibri")
    //     .text(`${selectedState} ${titlesRent[i]}`);
    // }
  }
  
  mounted() {
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
</style>
