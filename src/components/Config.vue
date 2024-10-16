<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>API Configuration</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" offset-sm="3">
        <v-select
          v-model="selectedApi"
          :items="apiOptions"
          label="Select API"
          @update:model-value="switchApi"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <p>Currently Selected API: {{ selectedApi === 'catapi' ? 'Cat API' : 'Fox API' }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn to="/">Back to Carousel</v-btn> <!-- Navigation to home -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, computed } from 'vue';
import { useApiStore } from '../stores/useApiStore';

export default {
  setup() {
    const apiStore = useApiStore();
    const selectedApi = ref(apiStore.selectedApi);

    const apiOptions = [
      { title: 'Cat API', value: 'catapi' },
      { title: 'Fox API', value: 'foxapi' },
    ];

    const switchApi = (api) => {
      apiStore.switchApi(api);
      selectedApi.value = api;
    };

    return {
      selectedApi,
      switchApi,
      apiOptions,
    };
  },
};
</script>