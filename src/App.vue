<template>
  <div id="app">
    <div class="container px-4 mx-auto mt-8">
    <h1 class="text">Карта с путями</h1>
    <div class="text">
      <p>Пути на карте сторятся динамически с использованием модели кривых Безье.</p>
      <p>vue2, tailwindcss, SCSS, SVG</p>
    </div>

    </div>
    <map-bezier title = "Наши города" class="mt-4 mb-32" />
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

