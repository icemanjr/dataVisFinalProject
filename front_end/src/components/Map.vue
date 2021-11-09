<template>
  <div class="map">Map</div>
</template>

<script lang="ts">
import { Vue, Component } from "@/utils/vue-imports";
import * as d3 from "d3";

@Component({
  name: "Map",
  components: {},
})
export default class Map extends Vue {}
</script>

<style lang="scss">
@import "@/assets/css/styles.scss";
.map {
  @include component;
  background-color: pink;
}
</style>
