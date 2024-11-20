<template>
    <div>
      <router-view />  <!-- Đây là nơi các component sẽ được render theo router -->
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'App',
  });
  </script>
  
  <style>
  .page {
    width: 100%;
  }
  </style>