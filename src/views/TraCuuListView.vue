<template>
    <div id="wrapper">
        <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
                <div class="container-fluid">
                    <MuonSach />
                    <h1 class="h3 mb-2 text-gray-800">Danh Sách Mượn Trả</h1>
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
                                            <th>Mã Sách</th>
                                            <th>Ngày Mượn</th>
                                            <th>Ngày Trả</th>
                                            <th>Số lượng</th>
                                            <th>Trạng Thái</th>
                                            <th>Quản lý</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in List" :key="item._id">
                                            <td>{{ item.maDocGia }}</td>
                                            <td>
                                                <ul>
                                                    <li v-for="sach in item.dsSach" :key="sach._id">{{ sach.maSach }}
                                                    </li>
                                                </ul>
                                            </td>
                                            <td>{{ item.ngayMuon }}</td>
                                            <td>{{ item.ngayTra }}</td>
                                            <td>1</td>
                                            <td>
                                                {{ item.ngayTra ? 'Rồi' : 'Chưa' }}
                                            </td>
                                            <td>
                                                <div class="dropdown">
                                                    <button class="btn btn-secondary dropdown-toggle" type="button"
                                                        id="dropdownMenuButton" data-toggle="dropdown"
                                                        aria-haspopup="true" aria-expanded="false">
                                                        ...
                                                    </button>
                                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        <button class="dropdown-item"
                                                            @click="openEditModal(item)">Xem Chi Tiết</button>
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
    <TraCuuModal v-if="isEditModalOpen" :editedList="editedList" :Ten="Ten" @close="closeEditModal" @save="saveBook" />

    

</template>


<script>
import TraCuuModal from '@/components/TheoDoi/TraCuuModal.vue';
import MuonSach from '@/components/TheoDoi/MuonSach.vue';
export default {
    components: {
        TraCuuModal,
        MuonSach
    },
    props: {
        List: Array,
        Ten: Array,
        loading: Boolean,
        error: String,
        successMessage: String,
        isEditModalOpen: Boolean,
        editedList: Object,
    },

    emits: ['openEditModal', 'closeEditModal', 'saveBook', 'deleteBook', 'isAddModalOpen'], // Khai báo các sự kiện



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
        openAddModal() {
            isAddModalOpen = true
        }

    }
};
</script>