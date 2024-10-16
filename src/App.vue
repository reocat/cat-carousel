<template>
  <v-app>
    <v-main>
      <div id="app">
        <!-- Router View will load the appropriate component based on the route -->
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
// No additional script is needed here since routing is handled by Vue Router.
</script>
