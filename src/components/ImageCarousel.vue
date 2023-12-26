<template>
  <div>
    <h1>Random Cat Image Carousel</h1>
    <div class="image-carousel">
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else class="image-container">
        <button
          @click="prevImage"
          :disabled="currentIndex === 0"
          class="carousel-button left-button"
        >
          <span>
            <vue-feather type="arrow-left" class="icon" />
          </span>
        </button>
        <img :src="currentImage" alt="cat-image" class="carousel-image" rel="preload"/>
        <button
          @click="nextImage"
          :disabled="currentIndex === images.length - 1"
          class="carousel-button right-button"
        >
          <span>
            <vue-feather type="arrow-right" class="icon" />
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchCatApiImages } from "../api/catapi";
import VueFeather from "vue-feather";
import "@fontsource/poppins/800.css";

export default {
  components: {
    "vue-feather": VueFeather,
  },
  data() {
    return {
      loading: true,
      images: [],
      currentIndex: 0,
    };
  },
  async mounted() {
    try {
      await this.loadImages();
    } catch (error) {
      this.loading = false;
    }
  },
  computed: {
    currentImage() {
      return this.images.length ? this.images[this.currentIndex] : null;
    },
  },
  watch: {
    currentIndex(newValue) {
      if (newValue === this.images.length - 1) {
        // When reaching the end, trigger auto-refresh
        this.loadImages();
      }
    },
  },
  methods: {
    async loadImages() {
      this.loading = true;
      try {
        const newImages = await fetchCatApiImages();
        this.images = [...this.images, ...newImages];
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
    nextImage() {
      if (this.currentIndex < this.images.length - 1) {
        this.currentIndex += 1;
      }
    },
    prevImage() {
      if (this.currentIndex > 0) {
        this.currentIndex -= 1;
      }
    },
  },
};
</script>
