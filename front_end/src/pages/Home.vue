<template>
  <div class="home">
    <Map />
    <div class="lgs">
    <LineGraphs :index="0" />
    <!-- <LineGraphs :index="1" />
    <LineGraphs :index="2" />
    <LineGraphs :index="3" />
    <LineGraphs :index="4" />
    <LineGraphs :index="5" />
    <LineGraphs :index="6" />
    <LineGraphs :index="7" />
    <LineGraphs :index="8" />
    <LineGraphs :index="9" />
    <LineGraphs :index="10" />
    <LineGraphs :index="11" /> -->
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
.lgs {
  height: 900px;
  display: grid;
  width: 100%;
  // grid-template-columns: 25% 25% 25% 25%;
  grid-template-columns: 33% 33% 33% ;
  grid-template-rows: 200px 200px 200px;
}
</style>
