<template>
  <v-app-bar :height="appBarHeight">
    <v-btn icon href="https://github.com/reocat/cat-carousel" target="_blank">
      <v-icon>mdi-github</v-icon>
    </v-btn>
    <v-toolbar-title>Cat Carousel</v-toolbar-title>
    <v-btn icon>
      <v-icon>mdi-login</v-icon>
    </v-btn>
  </v-app-bar>
  <h1>Random Cat Image Carousel</h1>
  <v-container class="fill-height">
    <div class="image-carousel">
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else class="image-container">
        <button
          @click="prevImage"
          :disabled="currentIndex === 0"
          class="carousel-button left-button"
        >
          <span>
            <v-icon>mdi-arrow-left</v-icon>
          </span>
        </button>
        <transition name="fade" mode="out-in">
          <img
            :key="currentImage"
            :src="currentImage"
            alt="cat-image"
            class="carousel-image"
            rel="preload"
          />
        </transition>
        <button
          @click="nextImage"
          :disabled="currentIndex === images.length - 1"
          class="carousel-button right-button"
        >
          <span>
            <v-icon>mdi-arrow-right</v-icon>
          </span>
        </button>
      </div>
    </div>
  </v-container>
</template>

<script>
import { ref, onMounted, computed, watch, onBeforeUnmount } from 'vue';
import { fetchCatApiImages } from "../api/catapi";

export default {
  setup() {
    const loading = ref(true);
    const images = ref([]);
    const currentIndex = ref(0);
    const appBarHeight = ref(64); // Default to desktop height

    const updateAppBarHeight = () => {
      appBarHeight.value = window.innerWidth <= 600 ? 56 : 64;
    };

    const handleKeydown = (event) => {
      if (event.key === 'ArrowLeft') {
        prevImage();
      } else if (event.key === 'ArrowRight') {
        nextImage();
      }
    };

    onMounted(() => {
      loadImages();
      updateAppBarHeight();
      window.addEventListener('resize', updateAppBarHeight);
      window.addEventListener('keydown', handleKeydown);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', updateAppBarHeight);
      window.removeEventListener('keydown', handleKeydown);
    });

    const currentImage = computed(() => {
      return images.value.length ? images.value[currentIndex.value] : null;
    });

    watch(currentIndex, (newValue) => {
      if (newValue === images.value.length - 1) {
        loadImages();
      }
    });

    const loadImages = async () => {
      loading.value = true;
      try {
        const newImages = await fetchCatApiImages();
        images.value = [...images.value, ...newImages];
        loading.value = false;
      } catch (error) {
        console.error('Error loading images:', error);
        loading.value = false;
      }
    };

    const nextImage = () => {
      if (currentIndex.value < images.value.length - 1) {
        currentIndex.value += 1;
      }
    };

    const prevImage = () => {
      if (currentIndex.value > 0) {
        currentIndex.value -= 1;
      }
    };

    return {
      loading,
      images,
      currentIndex,
      currentImage,
      appBarHeight,
      nextImage,
      prevImage,
    };
  },
};
</script>
