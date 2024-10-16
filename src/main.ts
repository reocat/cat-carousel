/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App
 */
// Plugins
import { registerPlugins } from '@/plugins'
// Components
import App from './App.vue'
// Composables
import { createApp } from 'vue'
// Styles
import './styles/index.css'
import './styles/fonts.css'
// Pinia
import { createPinia } from 'pinia';
// Vue Router
import { createRouter, createWebHistory } from 'vue-router';
// Vue Lazyload
import VueLazyload from 'vue-lazyload'
// Import your components for routing
import ImageCarousel from '@/components/ImageCarousel.vue';
import Config from '@/components/Config.vue';

// Create a Pinia instance
const pinia = createPinia();

// Define routes
const routes = [
  { path: '/', component: ImageCarousel }, // Main carousel page
  { path: '/config', component: Config }, // Configuration page
];

// Create Vue Router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Create the app instance
const app = createApp(App);

// Use Pinia and Vue Router in the app
app.use(pinia);
app.use(router);

// Configure and use Vue Lazyload
app.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1,
  // You can add more options here as needed
});

// Register plugins (e.g., Vuetify)
registerPlugins(app);

// Mount the app
app.mount('#app');