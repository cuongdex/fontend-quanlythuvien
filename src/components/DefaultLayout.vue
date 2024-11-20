<template>
    <div>
      <!-- Header cố định -->
      <header>
        <AppHeader />
      </header>
  
      <!-- Nội dung sẽ thay đổi -->
      <main>
        <!-- <router-view /> -->
      </main>
    </div>
  </template>
  
  <script>
  import AppHeader from "@/components/AppHeader.vue";
  
  export default {
    name: "DefaultLayout",
    components: {
      AppHeader,
    },
  };
  </script>
  