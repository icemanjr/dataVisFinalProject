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
