import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: null,
    selectedState: "California",
    startIndex: 188,
    endIndex: 295
  },
  getters: {
    getMaxBuy: (state) => {
      function stateFilter(dat: any){
        return dat.RegionName === state.selectedState;
      }
      const st = state as any;
      const buyAvg = st.data["all_homes"].filter(stateFilter);
      const buy1 = st.data["one_bed"].filter(stateFilter);
      const buy2 = st.data["two_bed"].filter(stateFilter);
      const buy3 = st.data["three_bed"].filter(stateFilter);
      const buy4 = st.data["four_bed"].filter(stateFilter);
      const buy5 = st.data["five_plus_bed"].filter(stateFilter);
      const buy = [buyAvg[0], buy1[0], buy2[0], buy3[0], buy4[0], buy5[0]];
      let maxBuy = 0;
      let tempMax;
      for (let i=0; i<6; i++) {
        tempMax = Object.values(buy[i]).slice(state.startIndex, state.endIndex).map(Number).reduce(function(a,b){return Math.max(a,b)});
        if (maxBuy < tempMax) {
          maxBuy = tempMax;
        }
      }
      return maxBuy
    },
    getMaxRent: (state) => {
      function stateFilter(dat: any){
        return dat.RegionName === state.selectedState;
      }
      const st = state as any
      const rentAvg = st.data["all_homes_rental"].filter(stateFilter);
      const rent1 = st.data["one_bed_rental"].filter(stateFilter);
      const rent2 = st.data["two_bed_rental"].filter(stateFilter);
      const rent3 = st.data["three_bed_rental"].filter(stateFilter);
      const rent4 = st.data["four_bed_rental"].filter(stateFilter);
      const rent5 = st.data["five_plus_bed_rental"].filter(stateFilter);
      const rent = [rentAvg[0], rent1[0], rent2[0], rent3[0], rent4[0], rent5[0]];
      let tempMax;
      let maxRent = 0;
      for (let i=0; i<6; i++) {
        tempMax = Object.values(rent[i]).slice(state.startIndex, state.endIndex).map(Number).reduce(function(a,b){return Math.max(a,b)})
        if (maxRent < tempMax) {
          maxRent = tempMax;
        }
      }
      return maxRent;
    }

  },
  mutations: {
    init: async (state) => {
      const t = new Date();
      const data = await axios.get('http://localhost:3000/data');
      console.log(`It took ${new Date().getTime() - t.getTime()} ms to get all of the data`)
      state.data = data.data
    },
    changeSelectedState: (state, newState) => {
      state.selectedState = newState
    }
  },
  actions: {},
  modules: {},
});
