<template>
    <NSXListView
        :nsxs="nsxs"
        :loading="loading"
        :error="error"
        :successMessage="successMessage"
        :isEditModalOpen="isEditModalOpen"
        :editednsx="editednsx"
        @openEditModal="openEditModal"
        @closeEditModal="closeEditModal"
        @saveBook="saveBook"
        @deleteBook="deleteBook"
    />
</template>

<script>
import NSXListView from "@/views/NSXListView.vue";
import NSXService from "@/service/nsx.service";  // You seem to be using NSXService, not BookService

export default {
    components: {
        NSXListView
    },
    data() {
        return {
            nsxs: [],  // Ensure this is an array
            loading: true,
            error: null,
            successMessage: null,
            isEditModalOpen: false,
            editednsx: null,  // editednsx is used for passing the edited object to the modal
            editedBook: null  // Ensure this is defined for editing books
        };
    },
    mounted() {
        this.fetchBooks(); // Fetch books when the component is mounted
    },
    methods: {
        // Fetch books from the API
        async fetchBooks() {
            try {
                const response = await NSXService.getAll();  // Make sure this API returns an object with a 'data' array
                this.nsxs = response.data.data;  // Assuming 'response.data' is the array you want
                // console.log(this.nsxs);  // Debug log to inspect the fetched data
            } catch (err) {
                this.error = 'Failed to fetch books. Please try again later.';
            } finally {
                this.loading = false;
            }
        },

        // Open the modal to edit a book
        openEditModal(nsx) {
            this.editednsx = { ...nsx };  // Create a copy of the book for editing
            this.isEditModalOpen = true;
        },

        // Close the edit modal
        closeEditModal() {
            this.isEditModalOpen = false;
            this.editednsx = null;  // Reset the edited object when closing the modal
        },

        // Save the edited book data
        async saveBook() {
            try {
                await NSXService.update(this.editednsx.MaNXB, this.editednsx);  // Ensure update method is available in NSXService
                this.nsxs = this.nsxs.map((nsx) =>
                    nsx._id === this.editednsx._id ? this.editednsx : nsx
                );
                this.successMessage = "Sửa thành công!";
                this.closeEditModal();
            } catch (err) {
                this.error = "Không thể lưu thông tin sách!";
            }
        },

        // Delete a book
        async deleteBook(nsxId) {
            try {
                await NSXService.delete(nsxId);  // Ensure delete method is available in NSXService
                this.nsxs = this.nsxs.filter(nsx => nsx._id !== nsxId);
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
