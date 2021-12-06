<template>
  <div class="home">
    <Map />
    <div class="line-graphs">
      <LineGraphs v-for="(el, index) in getArray()" :key="index" :index="index" />
    </div>
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
export default class Home extends Vue {
  getArray() {
    return new Array(50)
  }
}
</script>

<style lang="scss">
.home {
  height: 100%;
  display: grid;
  grid-template-rows: 50% auto; 
}
.line-graphs {
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
}
</style>
