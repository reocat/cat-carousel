<template>
  <v-app-bar :height="appBarHeight">
    <v-btn icon href="https://github.com/reocat/cat-carousel" target="_blank">
      <v-icon>mdi-github</v-icon>
    </v-btn>
    <v-toolbar-title>{{ apiTitle }} Carousel</v-toolbar-title>
    <v-btn icon>
      <v-icon>mdi-login</v-icon>
    </v-btn>
  </v-app-bar>

  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Random {{ apiTitle }} Image Carousel</h1>
      </v-col>
    </v-row>

    <v-row class="fill-height">
      <v-col cols="12">
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
                v-if="currentImage"
                :key="currentIndex"
                v-lazy="currentImage"
                :alt="apiTitle.toLowerCase() + '-image'"
                class="carousel-image"
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
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="d-flex justify-space-around">
        <v-btn variant="text" @click="show = !show">
          Authors
          <v-tooltip
            activator="parent"
            location="top"
            open-delay="200"
            close-delay="200"
            content-class="au-tooltip"
          >
            <span>
              Made by
              <a href="https://github.com/reocat" target="_blank" class="links">
                reocat
              </a>
              and
              <a href="https://github.com/L1ttleWizard" target="_blank" class="links">
                L1ttleWizard
              </a>
            </span>
          </v-tooltip>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, onMounted, computed, watch, onBeforeUnmount } from 'vue';
import { useApiStore } from '../stores/useApiStore';
import debounce from 'lodash/debounce';

export default {
  setup() {
    const loading = ref(true);
    const images = ref([]);
    const currentIndex = ref(0);
    const appBarHeight = ref(64);
    const apiStore = useApiStore(); // Use API store
    const prefetchCount = 5;

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

    const loadImages = async (count = prefetchCount) => {
      if (!loading.value) loading.value = true;
      try {
        const newImages = await apiStore.fetchImages(count);
        images.value = [...images.value, ...newImages];
      } catch (error) {
        console.error('Error loading images:', error);
      } finally {
        loading.value = false;
      }
    };

    const debouncedLoadImages = debounce(loadImages, 300);

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

    const currentImage = computed(() => {
      return images.value.length ? images.value[currentIndex.value] : null;
    });

    const currentApi = computed(() => apiStore.selectedApi);

    const apiTitle = computed(() => {
      switch (apiStore.selectedApi) {
        case 'catapi':
          return 'Cat';
        case 'foxapi':
          return 'Fox';
        case 'purrbot':
          return 'Purrbot GIF';
        case 'nekos':
          return 'Neko';
        default:
          return 'Animal';
      }
    });

    // Konami code tracking
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = ref(0);

    const handleKonamiKeydown = (event) => {
      if (event.key === konamiCode[konamiIndex.value]) {
        konamiIndex.value++;
        if (konamiIndex.value === konamiCode.length) {
          triggerKonamiCodeEffect();
          konamiIndex.value = 0;
        }
      } else {
        konamiIndex.value = 0;
      }
    };

    const triggerKonamiCodeEffect = () => {
      const randomChoice = Math.random() < 0.5 ? 'purrbot' : 'nekos';
      apiStore.switchApi(randomChoice); // Update store and localStorage
      console.log('Konami code activated! Switching to:', randomChoice);
      alert(`Nyan! Please, refresh this page!`);
    };

    onMounted(() => {
      loadImages();
      updateAppBarHeight();
      window.addEventListener('resize', updateAppBarHeight);
      window.addEventListener('keydown', handleKeydown);
      window.addEventListener('keydown', handleKonamiKeydown); // Add Konami code listener
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', updateAppBarHeight);
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('keydown', handleKonamiKeydown); // Remove Konami code listener
      debouncedLoadImages.cancel();
    });

    watch(currentIndex, (newValue) => {
      if (newValue >= images.value.length - prefetchCount) {
        debouncedLoadImages(prefetchCount);
      }
    });

    return {
      loading,
      images,
      currentIndex,
      currentImage,
      appBarHeight,
      nextImage,
      prevImage,
      currentApi,
      apiTitle,
    };
  },
};
</script>
