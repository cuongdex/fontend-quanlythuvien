<template>
    <AppHeader/>
    <div>
      <router-view />
    </div>
  </template>

  <script>
import AppHeader from './AppHeader.vue';
import Home from './Home.vue';
export default {
    components: {
        AppHeader,
        Home
    },
};

</script>