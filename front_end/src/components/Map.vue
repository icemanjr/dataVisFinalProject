<template>
  <div class="map">
    <p>hi{{selected()}}</p>
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
  width = 600;
  height = 500;

  drawMap(data) {
    if (!data) return;
    const svg = d3.select(".map")
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height)

    d3.json("http://localhost:3000/geojson").then((us) => {
      const projection = d3.geoAlbersUsa()
        .scale(700)
        .translate([this.width / 2, this.height / 2])

      const path = d3.geoPath()
        .projection(projection)

      svg.selectAll("path")
        .data(us.features)
        .enter()
        .append("path")
        .attr("d", path)
        .style("stroke", "#f00")
        .style("stroke-width", "1")
        .style("fill", "white")
        .on("mouseover", function(d,e) {
          d3.select(this)
            .style("fill", "blue")
        })
        .on("click", (d,e) => {
          this.$store.commit("changeSelectedState", e.properties.name)
        })
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
  background-color: pink;
}
</style>
