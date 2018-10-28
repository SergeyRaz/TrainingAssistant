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
@import "./styles/global_styles.scss";
body {
  background-image: url("./img/white-fabric.png");
}
#app {
  display: grid;
  grid-template-rows: 50px 1fr 50px;
  min-height: 100vh;
  margin: 0 auto;
}
</style>
