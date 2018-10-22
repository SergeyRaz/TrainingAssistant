<template>
  <div id="app">
    <headerComp></headerComp>
    <mainComp></mainComp>
    <footerComp></footerComp>
  </div>
</template>

<script>
import headerComp from "./components/headerComp.vue";
import mainComp from "./components/mainComp.vue";
import footerComp from "./components/footerComp.vue";
export default {
  components: {
    headerComp,
    mainComp,
    footerComp
  }
};
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  list-style: none;
  text-decoration: none;
  color: #212;
  font-family: "Roboto", sans-serif;
}
body {
  background-image: url("./img/white-fabric.png");
}
#app {
  display: grid;
  grid-template-rows: 50px 1fr 50px;
  height: 100vh;
  // border-left: 1px solid #eee;
  // border-right: 1px solid #eee;
  margin: 0 auto;
}
</style>
