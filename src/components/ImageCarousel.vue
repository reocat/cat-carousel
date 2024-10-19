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
    <!-- Carousel Header -->
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">Random {{ apiTitle }} Image Carousel</h1>
      </v-col>
    </v-row>

    <!-- Plyr Player Controls -->
    <v-row>
      <v-col cols="12" class="d-flex justify-center">
        <v-btn @click="togglePlayer">{{ showPlayer ? 'Hide' : 'Show' }} Player</v-btn>
      </v-col>
    </v-row>

    <!-- Lazy-loaded Floating Player Component -->
    <Suspense v-if="showPlayer">
      <template #default>
        <LazyFloatingPlayer
          v-model:showPlayer="showPlayer"
          v-model:position="playerPosition"
          v-model:size="playerSize"
          :musicOptions="musicOptions"
        />
      </template>
      <template #fallback>
        <div>Loading player...</div>
      </template>
    </Suspense>

    <!-- Image Carousel Section -->
    <v-row class="fill-height">
      <v-col cols="12">
        <div class="image-carousel">
          <div v-if="loading" class="loading">Loading...</div>
          <div v-else class="image-container">
            <button @click="prevImage" :disabled="currentIndex === 0" class="carousel-button left-button">
              <v-icon>mdi-arrow-left</v-icon>
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
              <v-icon>mdi-arrow-right</v-icon>
            </button>
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- Authors and Music Controls -->
    <v-row>
      <v-col cols="12" class="d-flex justify-center">
        <v-btn variant="text" @click="show = !show">
          Authors
          <v-tooltip activator="parent" location="top" open-delay="200" close-delay="200" content-class="au-tooltip">
            <span>
              Made by
              <a href="https://github.com/reocat" target="_blank" class="links">reocat</a> and
              <a href="https://github.com/L1ttleWizard" target="_blank" class="links">L1ttleWizard</a>
            </span>
          </v-tooltip>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, onMounted, computed, watch, onBeforeUnmount, defineAsyncComponent } from 'vue';
import { useApiStore } from '../stores/useApiStore';
import debounce from 'lodash/debounce';

// Lazy-loaded FloatingPlayer component
const LazyFloatingPlayer = defineAsyncComponent(() => import('./FloatingPlayer.vue'));

export default {
  components: {
    LazyFloatingPlayer,
  },
  setup() {
    const loading = ref(true);
    const images = ref([]);
    const currentIndex = ref(0);
    const appBarHeight = ref(64);
    const apiStore = useApiStore();
    const prefetchCount = 5;
    const showPlayer = ref(false);
    const playerPosition = ref({ x: 20, y: 20 });
    const playerSize = ref({ width: 300, height: 200 });
    const musicOptions = [
      { text: 'Lo-fi', value: 'jfKfPfyJRdk' },
      { text: 'Nyan Cat Soundtrack', value: 'zqLEO5tIuYs' },
      { text: 'Rain Sounds', value: 'mPZkdNFkNps' },
      { text: 'SynthWave', value: '4xDzrJKXOOY' },
    ];

    // Konami code handling
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    let konamiTimer;

    const handleKeydown = (event) => {
      if (event.key === 'ArrowLeft') {
        prevImage();
      } else if (event.key === 'ArrowRight') {
        nextImage();
      }

      // Konami code handling
      if (event.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          triggerKonamiCodeEffect();
          konamiIndex = 0;
        }
        clearTimeout(konamiTimer);
        konamiTimer = setTimeout(() => konamiIndex = 0, 1000);
      } else {
        konamiIndex = 0;
      }
    };

    const triggerKonamiCodeEffect = () => {
      const randomChoice = Math.random() < 0.5 ? 'purrbot' : 'nekos';
      apiStore.switchApi(randomChoice);
      console.log('Konami code activated! Switching to:', randomChoice);
      alert(`Nyan! Please, refresh this page!`);
    };

    const updateAppBarHeight = () => {
      appBarHeight.value = window.innerWidth <= 600 ? 56 : 64;
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
        case 'catapi': return 'Cat';
        case 'foxapi': return 'Fox';
        case 'purrbot': return 'Purrbot GIF';
        case 'nekos': return 'Neko';
        default: return 'Animal';
      }
    });

    const togglePlayer = () => {
      showPlayer.value = !showPlayer.value;
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
      clearTimeout(konamiTimer);
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
      showPlayer,
      musicOptions,
      togglePlayer,
      playerPosition,
      playerSize,
    };
  },
};
</script>