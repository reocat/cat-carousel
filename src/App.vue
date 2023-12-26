<!-- App.vue -->
<template>
  <div id="app">
    <ImageCarousel />
  </div>
</template>

<script>
import ImageCarousel from "./components/ImageCarousel.vue";

export default {
  components: {
    ImageCarousel,
  },
};
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin-top: 60px;
}
</style>
