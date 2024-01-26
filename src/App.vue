<template>
  <Main />
</template>

<script>
import Main from "./components/HelloWorld.vue"

export default {
  name: "App",
  components: {
    Main,
  },
}
</script>

<style>
* {
  box-sizing: border-box;
}
html, body, #app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
