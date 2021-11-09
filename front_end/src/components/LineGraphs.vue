<template>
  <div class="line-graphs">
    Line Graphs
    <div class="graph"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "@/utils/vue-imports";
import * as d3 from "d3";

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
</style>
