import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    notes: []
  },
  /**********************************************/
  getters: {
    notes(state) {
      return state.notes;
    }
  },
  /**********************************************/
  mutations: {
    // Создание заметки
    CreateNote(getters, obj) {
      getters.notes.push(obj);
    },
    // Удаление заметки
    DelNotes(getters, noteIndex) {
      getters.notes.splice(noteIndex, 1);
    }
  },
  strict: true,
  /**********************************************/
  actions: {
    upLoadVideo() {}
  }
});
