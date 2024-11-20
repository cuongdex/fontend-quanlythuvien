<template>
    <BookListView
        :books="books"
        :loading="loading"
        :error="error"
        :successMessage="successMessage"
        :isEditModalOpen="isEditModalOpen"
        :editedBook="editedBook"
        @openEditModal="openEditModal"
        @closeEditModal="closeEditModal"
        @saveBook="saveBook"
        @deleteBook="deleteBook"
    />
</template>

<script>

import BookListView from "@/views/BookListView.vue";
import BookService from "@/service/book.service";

export default {
    components: {
        BookListView
    },
    data() {
        return {
            books: [],
            loading: true,
            error: null,
            successMessage: null,
            isEditModalOpen: false,
            editedBook: null
        };
    },
    mounted() {
        // console.log('Component Mounted'); // Log kiểm tra
        this.fetchBooks();
    },
    methods: {
        async fetchBooks() {
            try {
                const response = await BookService.getAll();
                this.books = response.data;
                // console.log(this.books);
                
            } catch (err) {
                this.error = 'Failed to fetch books. Please try again later.';
            } finally {
                this.loading = false;
            }
        },

        openEditModal(book) {
            this.editedBook = { ...book };
            this.isEditModalOpen = true;
            console.log(this.isEditModalOpen);
            
        },
        closeEditModal() {
            this.isEditModalOpen = false;
            this.editedBook = null;
        },

        async saveBook() {
            try {
                await BookService.update(this.editedBook.MaSach, this.editedBook);
                this.books = this.books.map((book) =>
                    book._id === this.editedBook._id ? this.editedBook : book
                );
                this.successMessage = "Sửa thành công!";
                this.closeEditModal();
            } catch (err) {
                this.error = "Không thể lưu thông tin sách!";
            }
        },

        async deleteBook(bookId) {
            try {
                await BookService.delete(bookId);
                this.books = this.books.filter(book => book._id !== bookId);
                this.successMessage = "Xóa thành công!";
            } catch (err) {
                this.error = "Không thể xóa!";
            }   
        }
    }
};
</script>

<style scoped>
/* Add your container logic styling here */
</style>
