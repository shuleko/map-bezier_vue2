<template>
  <div id="app">
    <div class="text-green-700 text-xl">Hello, from TailwindCSS!</div>
    <map-bezier/>

    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Map from './components/Map.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    "map-bezier": Map
  }
}
</script>

<style lang="scss">

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
