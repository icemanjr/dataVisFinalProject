<template>
  <div class="home">
    <Map />
    <LineGraphs />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "@/utils/vue-imports";
import Map from "@/components/Map.vue";
import LineGraphs from "@/components/LineGraphs.vue";

@Component({
  name: "Home",
  components: {
    Map,
    LineGraphs,
  },
})
export default class Home extends Vue {}
</script>

<style lang="scss">
.home {
  height: 100%;
  display: grid;
  grid-template-columns: 60% 40%;
  
}
</style>
