<template>
    <div id="wrapper">
        <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
                <div class="container-fluid">
                    <h1 class="h3 mb-2 text-gray-800">Danh Sách Đọc Giả</h1>
                    <div v-if="successMessage" class="alert alert-success alert-dismissible fade show" role="alert">
                        {{ successMessage }}
                        <button type="button" class="btn-close" @click="successMessage = null"
                            aria-label="Close"></button>
                    </div>

                    <div v-if="loading" class="alert alert-info">
                        Loading book details...
                    </div>

                    <div v-if="error" class="alert alert-danger">
                        {{ error }}
                    </div>

                    <div class="card shadow mb-4">

                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>Mã Đọc Giả</th>
                                            <th>Họ Lót </th>
                                            <th>Tên</th>
                                            <th>Ngày Sinh</th>
                                            <th>Phái</th>
                                            <th>Địa Chỉ</th>
                                            <th>Điện Thoại</th>
                                            <th>Quản lý</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in DocGia" :key="item._id">
                                            <td>{{ item.MaDocGia }}</td>
                                            <td>{{ item.HoLot }}</td>
                                            <td>{{ item.Ten }}</td>
                                            <td>{{ item.NgaySinh }}</td>
                                            <td>{{ item.Phai }}</td>
                                            <td>{{ item.DiaChi }}</td>
                                            <td>{{ item.DienThoai }}</td>
                                            
                                            <td>
                                                <div class="dropdown">
                                                    <button class="btn btn-secondary dropdown-toggle" type="button"
                                                        id="dropdownMenuButton" data-toggle="dropdown"
                                                        aria-haspopup="true" aria-expanded="false">
                                                        ...
                                                    </button>
                                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        <button class="dropdown-item"
                                                            @click="openEditModal(item)">Sửa</button>
                                                        <button class="dropdown-item"
                                                            @click="deleteBook(item._id)">Xóa</button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal for Edit -->
    <DocGiaEditModal v-if="isEditModalOpen" :editedDocGia="editedDocGia" @close="closeEditModal" @save="saveBook" />


</template>


<script>

import DocGiaEditModal from "@/components/DocGia/DocGiaEditModal.vue";

export default {
    components: {
        DocGiaEditModal
        
    },
    props: {
        DocGia: Array,
        loading: Boolean,
        error: String,
        successMessage: String,
        isEditModalOpen: Boolean,
        editedDocGia: Object
    },
    mounted() {
        // console.log(this.nsx);  // Logs the nsx prop when the component is mounted
    },
    emits: ['openEditModal', 'closeEditModal', 'saveBook', 'deleteBook','isAddModalOpen'], // Khai báo các sự kiện

    methods: {
        openEditModal(book) {
            this.$emit('openEditModal', book);
            // Mở modal chỉnh sửa với sách được chọn

        },
        closeEditModal() {
            this.$emit('closeEditModal');  // Đóng modal
        },
        saveBook(updatedBook) {
            this.$emit('saveBook', updatedBook);  // Lưu thông tin sách đã sửa
        },
        deleteBook(bookId) {
            this.$emit('deleteBook', bookId);  // Xóa sách
        },

    }
};
</script>