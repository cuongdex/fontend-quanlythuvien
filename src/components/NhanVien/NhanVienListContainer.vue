<template>
    <NhanVienListView
        :NhanVien="NhanVien"
        :loading="loading"
        :error="error"
        :successMessage="successMessage"
        :isEditModalOpen="isEditModalOpen"
        :editedNhanVien="editedNhanVien"
        @openEditModal="openEditModal"
        @closeEditModal="closeEditModal"
        @saveBook="saveBook"
        @deleteBook="deleteBook"
    />
</template>

<script>
import NhanVienService from '@/service/NhanVien.service';
import NhanVienListView from '@/views/NhanVienListView.vue';
export default {
    components: {
        NhanVienListView
    },
    data() {
        return {
            NhanVien: [],  // Ensure this is an array
            loading: true,
            error: null,
            successMessage: null,
            isEditModalOpen: false,
            editedNhanVien: null,  // editednsx is used for passing the edited object to the 
        };
    },
    mounted() {
        this.fetchBooks(); // Fetch books when the component is mounted
    },
    methods: {
        // Fetch books from the API
        async fetchBooks() {
            try {
                const response = await NhanVienService.getAll();  // Make sure this API returns an object with a 'data' array
                this.NhanVien = response.data;  // Assuming 'response.data' is the array you want
                // console.log(this.DocGia);  // Debug log to inspect the fetched data
            } catch (err) {
                this.error = 'Failed to fetch books. Please try again later.';
            } finally {
                this.loading = false;
            }
        },

        // Open the modal to edit a book
        openEditModal(NhanVien) {
            this.editedNhanVien = { ...NhanVien };  // Create a copy of the book for editing
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
                await NhanVienService.update(this.editedNhanVien.MSNV, this.editedNhanVien);  // Ensure update method is available in NSXService
                this.NhanVien = this.NhanVien.map((nsx) =>
                    nsx.MSNV === this.editedNhanVien.MSNV ? this.editedNhanVien: nsx
                );
                this.successMessage = "Sửa thành công!";
                this.closeEditModal();
            } catch (err) {
                this.error = "Không thể lưu thông tin!";
            }
        },

        // Delete a book
        async deleteBook(nsxId) {
            try {
                await NhanVienService.delete(nsxId);  // Ensure delete method is available in NSXService
                this.NhanVien = this.NhanVien.filter(nsx => nsx.MSNV !== nsxId);
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
