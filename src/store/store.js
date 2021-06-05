import Vuex from "vuex";
import Vue from "vue";
import managerStore from "./notesManager";
import publicStore from "./public";
import detailsStore from "./details";

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    manager: managerStore,
    public: publicStore,
    details: detailsStore
  }
});

export default store;
