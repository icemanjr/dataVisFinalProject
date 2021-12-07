<template>
  <div class="map">
    <p>{{selected()}}</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "@/utils/vue-imports";
import * as d3 from "d3";

@Component({
  name: "Map",
  components: {},
})
export default class Map extends Vue {
  data = () => this.$store.state.data;
  selected = () => this.$store.state.selectedState;
  width_pct = 66;
  height_pct = 100;
  height_margin = 40;
  legendWidth = 400;
  legendHeight = 20;


  drawMap(data) {
    if (!data) return;
    const colors = ["#eff3ff", "#bdd7e7", "#6baed6", "#3182bd", "#08519c"];
    const fill = d3.scaleQuantile().range(colors);
    const getFillVal = d => parseFloat(d["2020-03-31"]) / parseFloat(d["2005-01-31"]) * 100;
    const w = d3.select(".map")
    fill.domain(d3.extent(data, d => getFillVal(d)));

    const svg = d3.select(".map")
      .append("svg")
      .attr("width", this.width_pct + "%")
      .attr("height", this.height_pct + "%");
    const svgWidth =  svg._groups[0][0].getBoundingClientRect().width
    const svgHeight = svg._groups[0][0].getBoundingClientRect().height

    d3.json("http://localhost:3000/geojson").then((us) => {
      const projection = d3.geoAlbersUsa()
        .scale(svgHeight * 1.5)
        .translate([svgWidth / 2 , svgHeight / 2])

      const path = d3.geoPath()
        .projection(projection)

      svg.selectAll("path")
        .data(us.features)
        .enter()
        .append("path")
        .attr("d", path)
        .style("stroke", "#000")
        .style("stroke-width", "1")
        .style("fill", function(d,e) {
          for (const state of data) {
            if (state.RegionName === d.properties.name) {
              return fill(getFillVal(state))
            }
          }
          return "#f00";
        })
        .on("mouseover", function(d,e) {
          d3.select(this)
            .style("fill", "#aaf")
        })
        .on("mouseout", function(d,e) {
          d3.select(this)
            .style("fill", function(d,e) {
              for (const state of data) {
                if (state.RegionName === d.properties.name) return fill(getFillVal(state))
              }
            })
        })
        .on("click", (d,e) => {
          this.$store.commit("changeSelectedState", e.properties.name)
        })
        const fillRange = [];
        const legendExtent = d3.extent(data, d =>  getFillVal(d));
        const min = legendExtent[0];
        const max = legendExtent[1];

        for(let i = 0;i <= colors.length;i++)
        fillRange.push(this.legendWidth/colors.length * i);

        let axisScale = d3.scaleQuantile().range(fillRange);

        let diff = (max - min)/colors.length;
        let LegendScale = [];
        for(let i = 0;i <= colors.length;i++)
        LegendScale.push(diff * (i + 1) + min);

        axisScale.domain(LegendScale);


        let legendaxis = d3.axisBottom(axisScale).tickFormat(x=>  x.toFixed(1) + "%");

        let legend = svg.selectAll(".map").data(colors).enter().append("g").attr("transform", "translate(" + (svgWidth / 2 - this.legendWidth / 2) + ", " + ( 10 ) + ")")
        legend.append("rect").attr("width", this.legendWidth/colors.length).attr("height", this.legendHeight).style("fill", d=>d)
            .attr("x", (d,i)=> this.legendWidth/colors.length * i)

        svg.append("g").attr("class", "axis")
            .attr("transform", "translate(" + (svgWidth / 2 - this.legendWidth/2) + ", " + (this.legendHeight + 10) + ")")
            .call(legendaxis);
    })
  }

  mounted() {

    this.$store.watch((state) =>{
      if (!state.data) return;
     return this.drawMap(state.data["all_homes"])

    })
  }

}
</script>

<style lang="scss">
@import "@/assets/css/styles.scss";
.map {
  @include component;
  background-color: rgb(240, 240, 240);
}
</style>
