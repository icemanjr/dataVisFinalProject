import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: null,
    selectedState: "Utah"
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
