<template>
  <div id="app">
    <div class="container mx-auto px-4 md:px-8" v-if="localStorageAvailable">
      <HeaderComponent></HeaderComponent>
      <MainComponent></MainComponent>
      <FooterComponent></FooterComponent>
    </div>
    <div class="main-app-disabled container my-12 mx-auto px-4 md:px-12" v-else>
      <h1>{{ noLocalStorageText }}</h1>
      <p>{{ appNotWork }}</p>
    </div>
  </div>
</template>

<script>
import HeaderComponent from "./components/HeaderComponent.vue";
import MainComponent from "./components/MainComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";

export default {
  name: "App",
  components: {
    HeaderComponent,
    MainComponent,
    FooterComponent
  },
  data() {
    return {
      localStorageAvailable: null,
      noLocalStorageText: "No localStorage available",
      appNotWork: "Sorry, the app doesn't work."
    };
  },
  mounted() {
    this.detectLocalStorage();
  },
  methods: {
    detectLocalStorage() {
      this.storageAvailable("localStorage")
        ? (this.localStorageAvailable = true)
        : (this.localStorageAvailable = false);
    },
    //Comprobación de localStorage: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
    storageAvailable(type) {
      var storage;
      try {
        storage = window[type];
        var x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
      } catch (e) {
        return (
          e instanceof DOMException &&
          (e.code === 22 ||
            e.code === 1014 ||
            e.name === "QuotaExceededError" ||
            e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
          storage &&
          storage.length !== 0
        );
      }
    }
  }
};
</script>
