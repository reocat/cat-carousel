import { defineStore } from 'pinia';
import { fetchCatApiImages } from '../api/catapi';
import { fetchFoxApiImages } from '../api/foxapi';
import { fetchPurrBotApiImages } from '../api/purrbot';
import { fetchNekoAPI } from '../api/nekos';

export const useApiStore = defineStore('apiStore', {
  state: () => ({
    // If no API is selected in localStorage, default to 'catapi'
    selectedApi: localStorage.getItem('selectedApi') || 'catapi',
  }),

  actions: {
    switchApi(newApi) {
      this.selectedApi = newApi;
      localStorage.setItem('selectedApi', newApi);
    },

    async fetchImages() {
        const apiMethods = {
            catapi: fetchCatApiImages,
            foxapi: fetchFoxApiImages,
            purrbot: fetchPurrBotApiImages,
            nekos: fetchNekoAPI
          };
          
          if (this.selectedApi in apiMethods) {
            return await apiMethods[this.selectedApi]();
          } else {
            throw new Error(`Invalid API selected: ${this.selectedApi}`);
          }
    },
  },
});
