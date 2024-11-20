<template>
    <TraCuuListView
        :List="List"
        :Ten="Ten"
        :loading="loading"
        :error="error"
        :successMessage="successMessage"
        :isEditModalOpen="isEditModalOpen"
        :editedList="editedList"
        @openEditModal="openEditModal"
        @closeEditModal="closeEditModal"
        @saveBook="saveBook"
        @deleteBook="deleteBook"
    />
</template>

<script>
import TraCuuListView from '@/views/TraCuuListView.vue';
import TraCuuService from '@/service/TraCuu.service';
export default {
    components: {
        TraCuuListView
    },
    data() {
        return {
            List: [],
            Ten:[],  // Ensure this is an array
            loading: true,
            error: null,
            successMessage: null,
            isEditModalOpen: false,
            editedList: null, 
            editedList: null, // editednsx is used for passing the edited object to the 
        };
    },
    mounted() {
        this.fetchBooks(); // Fetch books when the component is mounted
    },
    methods: {
        // Fetch books from the API
        async fetchBooks() {
            try {
                const response = await TraCuuService.getAll();  // Make sure this API returns an object with a 'data' array
                this.List = response.data; 
                this.Ten = response.Ten // Assuming 'response.data' is the array you want
                // console.log(this.Ten);  // Debug log to inspect the fetched data
            } catch (err) {
                this.error = 'Failed to fetch books. Please try again later.';
            } finally {
                this.loading = false;
            }
        },

        // Open the modal to edit a book
        async openEditModal(List) {
            this.editedList = { ...List }; 
            this.isEditModalOpen = true;
        },

        // Close the edit modal
        closeEditModal() {
            this.isEditModalOpen = false;
            this.editedList = null;  // Reset the edited object when closing the modal
        },

        // Save the edited book data
        async saveBook() {
            try {
                const response = await TraCuuService.tra({maDocGia: this.editedList.maDocGia});
                  // Ensure update method is available in NSXService
                this.List = this.List.map((nsx) =>
                    nsx.maDocGia === this.editedList.maDocGia ? this.editedList: nsx
                );
                this.successMessage = "Trả sách thành công!";
                this.closeEditModal();
                window.location.reload();
            } catch (err) {
                console.log(err);
                
                this.error = "Không thể trả sách!";
            }
        },

        // Delete a book
        async deleteBook(nsxId) {
            
        }
    }
};
</script>

<style scoped>
/* Add your container logic styling here */
</style>
