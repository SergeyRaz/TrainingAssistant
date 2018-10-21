<template>
  <section class="mainComp">
    <div class="videoContainer">
      <video class="myVideo" controls value="bcxvbxcv">
        <source src="src/video/vue-6-1.mp4" type="video/mp4">
      </video>
      <div class="addNote" @click="NotePopupActive">Добавить заметку</div>
      <div class="addNotePopup" @click.self="NotePopupActive" :class="{active:active}">
        <form class="addNotePopupForm">
          <input type="text" class="titleNote" v-model="$store.state.video.notes.noteTitle">
          <input type="submit" class="sendNote" @click.prevent="AddNote">
        </form>
      </div>
    </div>
    <div class="notesContainer">
      <div class="notesItem" @click="GoToNote">Тест</div>
    </div>
    <div class="galeryContainer"></div>
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
    GoToNote() {
      this.$store.commit("GoToNote");
    },
    NotePopupActive() {
      this.active = !this.active;
      this.$store.state.video.videoObj.pause();
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
  padding: 10px;
  border-bottom: 1px solid #eee;
  width: 100%;
  display: grid;
  grid-template-columns: 650px 1fr;
  grid-template-rows: 460px 1fr;
  grid-gap: 10px;
  .videoContainer,
  .notesContainer,
  .galeryContainer {
    border: 1px solid darkorange;
    padding: 10px;
  }
  .videoContainer {
    .myVideo {
      width: 100%;
    }
    .addNote {
      border: 1px solid #eee;
      display: inline-block;
      padding: 5px 25px;
      cursor: pointer;
      &:hover {
        background-color: #eee;
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
          width: 40%;
        }
      }
    }
  }
  .notesContainer {
    .notesItem {
      user-select: none;
      border: 1px solid #eee;
      display: inline-block;
      padding: 5px 25px;
      cursor: pointer;
      &:hover {
        background-color: #eee;
      }
    }
  }
  .galeryContainer {
    width: 100%;
  }
}
</style>
