<template>
  <section class="mainComp">
    <div class="videoContainer">
      <video class="myVideo" controls value="bcxvbxcv">
        <source src="src/video/vue-6-1.mp4" type="video/mp4">
      </video>
      <div class="addNote" @click="NotePopupActive">Добавить заметку <span class="num">1</span></div>
      <div class="addNotePopup" @click.self="NotePopupActive" :class="{active:active}">
        <form class="addNotePopupForm">
          <input type="text" class="titleNote" v-model="$store.state.video.notes.noteTitle">
          <input type="submit" class="sendNote" @click.prevent="AddNote">
          <span class="num">2</span>
        </form>
      </div>
    </div>
    <div class="notesContainer">
      <div class="notesItem" @click="GoToNote">Тест<span class="num">3</span></div>
    </div>
    <div class="galeryContainer">
      <div class="videoItem">1</div>
      <div class="videoItem">2</div>
      <div class="videoItem">3</div>
      <div class="videoItem">4</div>
      <div class="videoItem">5</div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      active: false,
      titleNote: ""
    };
  },
  methods: {
    NotePopupActive() {
      this.active = !this.active;
      this.$store.state.video.videoObj = document.querySelector(".myVideo");
      this.$store.state.video.videoObj.pause();
    },
    GoToNote() {
      this.$store.commit("GoToNote");
    },
    AddNote() {
      console.log("Создаем заметку и отправляем на сервер");
      this.active = !this.active;
      console.log(this.$store.state.video.notes.noteTitle);
      this.$store.commit("AddNote");
      this.$store.state.video.videoObj.play();
    }
  }
};
</script>
<style lang="scss">
.mainComp {
  padding: 10px 0;
  // border-bottom: 1px solid #eee;
  width: 100%;
  display: grid;
  grid-template-columns: 750px 1fr;
  grid-template-rows: 570px 1fr;
  grid-gap: 10px;
  max-width: 1400px;
  margin: 0 auto;
  .videoContainer,
  .notesContainer,
  .galeryContainer {
    background-color: rgba(255, 255, 255, 0.7);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    padding: 10px;
    border-radius: 5px;
    .num {
      background-color: green;
      padding: 3px 10px;
      border-radius: 3px;
      color: #fff;
      margin: 0px 0px 0px 10px;
      box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.7);
    }
  }
  .videoContainer {
    .myVideo {
      width: 100%;
    }
    .addNote {
      user-select: none;
      border: 1px solid #ddd;
      display: inline-flex;
      align-items: center;
      padding: 5px 25px;
      border-radius: 3px;
      cursor: pointer;
      &:hover {
        background-color: #ddd;
      }
    }
    .addNotePopup {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.7);
      display: none;
      align-items: center;
      justify-content: center;
      &.active {
        display: flex;
      }
      .addNotePopupForm {
        width: 500px;
        min-height: 70px;
        border-radius: 5px;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        .titleNote {
          padding: 5px 10px;
          width: 50%;
          margin: 0 10px 0 0;
        }
        .sendNote {
          padding: 5px 10px;
          width: 30%;
        }
      }
    }
  }
  .notesContainer {
    .notesItem {
      user-select: none;
      border: 1px solid #ddd;
      display: inline-flex;
      align-items: center;
      padding: 5px 25px;
      border-radius: 3px;
      cursor: pointer;
      &:hover {
        background-color: #ddd;
      }
    }
  }
  .galeryContainer {
    width: 100%;
    grid-column-start: 1;
    grid-column-end: 3;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    grid-gap: 10px;
    .videoItem {
      // border: 1px solid #ccc;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 50px;
      color: #ddd;
      border-radius: 5px;
      background-color: #eee;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
