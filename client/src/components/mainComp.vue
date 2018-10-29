<template>
  <section class="mainComp">
    <div class="videoContainer">
      <video class="myVideo" controls value="bcxvbxcv">
        <source src="src/video/vue-1-1.mp4" type="video/mp4">
      </video>
      <div class="addNote" @click="OpenPopupNote">Добавить заметку <span class="num">1</span></div>
      <div class="addNote" @click="TEST()">Тестовая кнопка <span class="num">5</span></div>
      <div class="addNotePopup" v-show="active" @click.self="OpenPopupNote">
        <form class="addNotePopupForm">
          <input type="text" class="titleNote" v-model="noteTitle">
          <button class="sendNote" @click.prevent="CreateNote()">Создать</button>
          <span class="num">2</span>
        </form>
      </div>
    </div>
    <div class="notesContainer">
      <div class="notesItem" v-for="(note, noteIndex, key) in notes" 
                            :key="key"
                            @click.self="GoToNote(noteIndex)"
                            >{{note.noteTitle}}<span class="num">3</span>
                            <span class="delNotes" @click="DelNotes(noteIndex)">✖</span>
      </div>
    </div>
    <div class="galeryContainer">
      <form class="addVideo" method="POST" enctype="multipart/form-data">
        <label>
          <span class="btnPlus">+</span>
          <input class="addVideoInput" type="file" name="file" @change="uploadFiles">
        </label>
      </form>
      <template>
        <div class="videoItem" v-for="(value, index, key) in nameFiles.data" :key="key">
          <span>{{value}}</span>
          <span class="delVideo" @click="deleteVideo(value, index)">✖</span>
        </div>
      </template>
    </div>
  </section>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      videoObj: {},
      active: false,
      noteTitle: "",
      nameFiles: ""
    };
  },
  computed: {
    ...mapGetters(["notes"])
  },
  beforeMount() {
    this.displayVideoName();
  },
  methods: {
    // Удаление видео файла
    deleteVideo(value, index) {
      this.nameFiles.data.splice(index, 1);
      axios.post("http://localhost:3000/deleteVideo", {
        value
      });
    },
    // Запрос на вывод имен файлов видео
    async displayVideoName() {
      let json = await axios.get("http://localhost:3000/nameFiles");
      this.nameFiles = json;
      return json;
    },
    // Загрузка видео на сервер
    uploadFiles() {
      const data = new FormData();
      var videoFile = document.querySelector(".addVideoInput");
      data.append("file", videoFile.files[0]);
      axios.post("http://localhost:3000/", data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      this.displayVideoName();
    },
    // Открытие Popup window
    OpenPopupNote() {
      this.active = !this.active;
      this.videoObj = document.querySelector(".myVideo");
      this.videoObj.pause();
    },
    // Создание заметки и отправка в Store
    CreateNote() {
      this.OpenPopupNote();
      this.$store.commit("CreateNote", {
        noteTitle: this.noteTitle,
        noteTime: parseInt(this.videoObj.currentTime)
      });
      this.noteTitle = "";
      this.videoObj.play();
    },
    // Переход к заметке
    GoToNote(noteIndex) {
      this.videoObj = document.querySelector(".myVideo");
      this.videoObj.currentTime = this.notes[noteIndex].noteTime;
      this.videoObj.play();
    },
    // Удаляем заметку из массива
    DelNotes(noteIndex) {
      this.$store.commit("DelNotes", noteIndex);
    }
  }
};
</script>
<style lang="scss">
@import "../styles/global_styles.scss";
.mainComp {
  padding: 10px 0;
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
      display: flex;
      align-items: center;
      justify-content: center;
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
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .notesItem {
      user-select: none;
      border: 1px solid #ddd;
      display: inline-flex;
      align-items: center;
      padding: 5px 10px 5px 10px;
      border-radius: 3px;
      margin: 2px 0;
      cursor: pointer;
      box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2);
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
    grid-gap: 10px;
    .videoItem,
    .addVideo {
      border: 3px solid green;
      @extend .center-flex;
      color: #333;
      border-radius: 5px;
      background-color: #eee;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      cursor: pointer;
      min-width: 240px;
      min-height: 200px;
      font-size: 18px;
      display: flex;
      align-items: center;
      &:hover {
        background-color: #ddd;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      }
    }
    .addVideo {
      font-size: 50px;
      label {
        width: 100%;
        height: 100%;
        @extend .center-flex;
        cursor: pointer;
        .addVideoInput {
          display: none;
        }
      }
    }
  }
}
.num {
  background-color: green;
  padding: 3px 10px;
  border-radius: 3px;
  color: #fff;
  margin: 0px 0px 0px 10px;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.7);
}
.delNotes,
.delVideo {
  margin: 0px 0px 0px 7px;
  padding: 2px 7px;
  border-radius: 3px;
  color: $color-white;
  background-color: darkred;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.7);
}
</style>
