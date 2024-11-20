<template>
    <DocGiaListView
        :DocGia="DocGia"
        :loading="loading"
        :error="error"
        :successMessage="successMessage"
        :isEditModalOpen="isEditModalOpen"
        :editedDocGia="editedDocGia"
        @openEditModal="openEditModal"
        @closeEditModal="closeEditModal"
        @saveBook="saveBook"
        @deleteBook="deleteBook"
    />
</template>

<script>
import docgiaService from '@/service/docgia.service';
import DocGiaListView from '@/views/DocGiaListView.vue';
export default {
    components: {
        DocGiaListView
    },
    data() {
        return {
            DocGia: [],  // Ensure this is an array
            loading: true,
            error: null,
            successMessage: null,
            isEditModalOpen: false,
            editedDocGia: null,  // editednsx is used for passing the edited object to the modal
            editedDocGia: null  // Ensure this is defined for editing books
        };
    },
    mounted() {
        this.fetchBooks(); // Fetch books when the component is mounted
    },
    methods: {
        // Fetch books from the API
        async fetchBooks() {
            try {
                const response = await docgiaService.getAll();  // Make sure this API returns an object with a 'data' array
                this.DocGia = response.data;  // Assuming 'response.data' is the array you want
                // console.log(this.DocGia);  // Debug log to inspect the fetched data
            } catch (err) {
                this.error = 'Failed to fetch books. Please try again later.';
            } finally {
                this.loading = false;
            }
        },

        // Open the modal to edit a book
        openEditModal(docGia) {
            this.editedDocGia = { ...docGia };  // Create a copy of the book for editing
            this.isEditModalOpen = true;
        },

        // Close the edit modal
        closeEditModal() {
            this.isEditModalOpen = false;
            this.editedDocGia = null;  // Reset the edited object when closing the modal
        },

        // Save the edited book data
        async saveBook() {
            try {
                await docgiaService.update(this.editedDocGia._id, this.editedDocGia);  // Ensure update method is available in NSXService
                this.DocGia = this.DocGia.map((nsx) =>
                    nsx._id === this.editedDocGia._id ? this.editedDocGia : nsx
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
                await docgiaService.delete(nsxId);  // Ensure delete method is available in NSXService
                this.DocGia = this.DocGia.filter(nsx => nsx._id !== nsxId);
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
