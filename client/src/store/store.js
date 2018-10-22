import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    video: {
      videoName: "name",
      videoTime: "videoTime",
      videoObj: "",
      notes: {
        noteTitle: "",
        noteTime: null
      }
    }
  },
  mutations: {
    GoToNote(state) {
      this.state.video.videoObj.currentTime = 2500;
      this.state.video.videoObj.play();
      console.log(this.state.video.videoObj);
      console.log(this.state.video.videoObj.src);
    },
    AddNote(state) {
      this.state.video.notes.noteTitle = "";
      console.log("очистили переменную с заголовком заметки");
    }
  }
});
