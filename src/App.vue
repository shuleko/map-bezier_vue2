<template>
  <div id="app">
    <h1 class="text">Карта с путями</h1>
    <div class="text">
      <p>Пути на карте сторятся динамически с использованием модели кривых Безье.</p>
    </div>

    <map-bezier title = "Наши города"/>
  </div>
</template>

<script>
import Map from './components/Map.vue'

export default {
  name: 'App',
  components: {
    "map-bezier": Map
  }
}
</script>

