<template>
    <div class="add-book-page">
      <h1>Thêm Sách Mới</h1>
      <AddBook />
    </div>
  </template>
  
  <script>
  import AddBook from '@/components/book/AddBook.vue';
  
  export default {
    components: {
      AddBook
    }
  };
  </script>
  
  <style scoped>
  .add-book-page {
    padding: 20px;
  }
  </style>
  