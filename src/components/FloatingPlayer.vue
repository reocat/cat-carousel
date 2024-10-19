<template>
  <div v-if="showPlayer"
       :class="['floating-player', { 'non-floating': isSmallScreen }]"
       :style="isSmallScreen ? {} : { top: position.y + 'px', left: position.x + 'px', width: size.width + 'px', height: size.height + 'px' }"
       @mousedown="startDragging"
       @touchstart="startDragging">
    <div class="player-header">
      <v-icon v-if="!isSmallScreen" @mousedown.stop @touchstart.stop>mdi-drag</v-icon>
      <v-select
        v-model="selectedMusic"
        :items="musicOptions"
        item-title="text"
        item-value="value"
        label="Select Music"
        @update:model-value="handleMusicSelection"
        dense
      ></v-select>
      <v-btn icon small @click="togglePlayer">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
    <vue-plyr ref="plyr" v-if="selectedMusic" class="player-container">
      <div data-plyr-provider="youtube" :data-plyr-embed-id="selectedMusic"></div>
    </vue-plyr>
    <div v-if="!isSmallScreen" class="resize-handle" @mousedown="startResizing" @touchstart="startResizing"></div>
  </div>
</template>

<script>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import VuePlyr from 'vue-plyr';
import 'vue-plyr/dist/vue-plyr.css';

export default {
  components: {
    VuePlyr,
  },
  props: {
    showPlayer: Boolean,
    musicOptions: Array,
  },
  emits: ['update:showPlayer', 'update:position', 'update:size'],
  setup(props, { emit }) {
    const selectedMusic = ref('');
    const plyr = ref(null);
    const position = ref({ x: 20, y: 20 });
    const size = ref({ width: 300, height: 200 });
    const isDragging = ref(false);
    const isResizing = ref(false);
    const dragOffset = ref({ x: 0, y: 0 });
    const isSmallScreen = ref(window.innerWidth <= 600);

    const togglePlayer = () => {
      emit('update:showPlayer', false);
      selectedMusic.value = '';
      if (plyr.value && plyr.value.player) {
        plyr.value.player.stop();
      }
    };

    const handleMusicSelection = (value) => {
      selectedMusic.value = value;
      if (plyr.value && plyr.value.player) {
        plyr.value.player.source = {
          type: 'video',
          sources: [{ src: value, provider: 'youtube' }],
        };
      }
    };

    const startDragging = (event) => {
      if (event.target.classList.contains('resize-handle')) return;
      isDragging.value = true;
      const clientX = event.clientX || event.touches[0].clientX;
      const clientY = event.clientY || event.touches[0].clientY;
      dragOffset.value = {
        x: clientX - position.value.x,
        y: clientY - position.value.y
      };
      document.addEventListener('mousemove', drag);
      document.addEventListener('touchmove', drag);
      document.addEventListener('mouseup', stopDragging);
      document.addEventListener('touchend', stopDragging);
    };

    const drag = (event) => {
      const clientX = event.clientX || event.touches[0].clientX;
      const clientY = event.clientY || event.touches[0].clientY;

      if (isDragging.value) {
        // Handle dragging
        position.value = {
          x: clientX - dragOffset.value.x,
          y: clientY - dragOffset.value.y,
        };
        emit('update:position', position.value);
      } else if (isResizing.value) {
        // Handle resizing (allow resizing in both directions)
        const deltaX = clientX - dragOffset.value.x;
        const deltaY = clientY - dragOffset.value.y;

        // Apply new width and height, ensuring they're not smaller than the minimum allowed values
        size.value = {
          width: Math.max(200, deltaX),
          height: Math.max(100, deltaY),
        };

        emit('update:size', size.value);
      }
    };

    const stopDragging = () => {
      isDragging.value = false;
      isResizing.value = false;
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('touchmove', drag);
      document.removeEventListener('mouseup', stopDragging);
      document.removeEventListener('touchend', stopDragging);
    };

    const startResizing = (event) => {
      isResizing.value = true;

      const clientX = event.clientX || event.touches[0].clientX;
      const clientY = event.clientY || event.touches[0].clientY;

      dragOffset.value = {
        x: clientX - size.value.width,
        y: clientY - size.value.height,
      };

      document.addEventListener('mousemove', drag);
      document.addEventListener('touchmove', drag);
      document.addEventListener('mouseup', stopDragging);
      document.addEventListener('touchend', stopDragging);
    };

    const updateScreenSize = () => {
      isSmallScreen.value = window.innerWidth <= 600;
    };

    watch(() => props.showPlayer, (newValue) => {
      if (!newValue) {
        selectedMusic.value = '';
        if (plyr.value && plyr.value.player) {
          plyr.value.player.stop();
        }
      }
    });

    onMounted(() => {
      window.addEventListener('resize', updateScreenSize);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', updateScreenSize);
    });

    return {
      selectedMusic,
      plyr,
      position,
      size,
      togglePlayer,
      handleMusicSelection,
      startDragging,
      startResizing,
      isSmallScreen,
    };
  },
};
</script>

<style scoped>
.floating-player {
  position: absolute;
  z-index: 1000;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  min-height: 100px;
}

.non-floating {
  position: static;
  width: 100%;
  height: auto;
  display: absolute;
  justify-content: center;
  align-items: center;
}

.player-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ccc;
}

.resize-handle {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  background-color: #ccc;
  cursor: se-resize;
}
</style>
