<template>
  <div class="home">
    <Map />
    <div class="lgs">
      <LineGraphs
        v-for="(param, i) in params"
        :key="i"
        :index="i"
        :category="param.category"
        :maxValue="param.maxValue"
      />
      <!-- <LineGraphs :index="0" :category="'all_homes'" :maxValue="maxBuy"/> -->
      <!-- <LineGraphs :index="1" :category="'five_plus_bed_rental'" :maxValue="maxRent"/> -->
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
  maxBuy() {
    return this.$store.getters["getMaxBuy"];
  }
  maxRent() {
    return this.$store.getters["getMaxRent"];
  }

  params = [
    {category: "all_homes", maxValue:this.maxBuy},
    {category: "one_bed", maxValue: this.maxBuy},
    {category: "two_bed", maxValue: this.maxBuy},
    {category: "three_bed", maxValue: this.maxBuy},
    {category: "four_bed", maxValue: this.maxBuy},
    {category: "five_plus_bed", maxValue: this.maxBuy},
  ]
  mounted() {
    console.log(this.params)
  }
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
