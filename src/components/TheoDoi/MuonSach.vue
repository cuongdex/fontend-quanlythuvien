<template>
    <div>
        <!-- Modal Mượn Sách -->
        <div class="modal" tabindex="-1" role="dialog" v-if="isModalOpen">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Mượn Sách</h5>
                        <button type="button" class="close" @click="closeModal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="borrowMultipleBooks">
                            <!-- Mã Độc Giả -->
                            <div class="form-group">
                                <label for="maDocGia">Mã Độc Giả</label>
                                <input type="text" id="maDocGia" class="form-control" v-model="maDocGia" required
                                    placeholder="Nhập mã độc giả" />
                            </div>

                            <!-- Chọn Nhiều Sách -->
                            <div class="form-group">
                                <label for="multiBooks">Chọn Sách Mượn</label>
                                <select v-model="selectedBooks" multiple class="form-control" id="multiBooks">
                                    <option v-for="book in availableBooks" :key="book.MaSach" :value="book.MaSach">
                                        {{ book.TenSach }}
                                    </option>
                                </select>
                            </div>

                            <!-- Nút Chọn Sách -->
                            <button type="button" class="btn btn-secondary" @click="addSelectedBooks">
                                Chọn Sách
                            </button>

                            <!-- Hiển thị sách đã chọn -->
                            <div v-if="selectedBooksList.length > 0" class="mt-3">
                                <h5>Sách Đã Chọn:</h5>
                                <ul>
                                    <li v-for="book in selectedBooksList" :key="book.MaSach">
                                        {{ book.TenSach }} (Mã sách: {{ book.MaSach }})
                                        <button type="button" class="btn btn-danger btn-sm"
                                            @click="removeBook(book.MaSach)">Xóa</button>
                                    </li>
                                </ul>
                            </div>

                            <!-- Nút Gửi -->
                            <button type="submit" class="btn btn-primary">Mượn Nhiều Sách</button>
                        </form>

                        <!-- Thông báo lỗi/success -->
                        <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
                        <p v-if="successMessage" class="text-success">{{ successMessage }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Nút mở modal -->
        <button @click="openModal" class="btn btn-success">Mượn Sách</button>
    </div>
</template>

<script>
import TraCuuService from '@/service/TraCuu.service';
import bookService from '@/service/book.service';

export default {
    data() {
        return {
            isModalOpen: false,
            maDocGia: '',           // Mã Độc Giả
            selectedBooks: [],      // Mã sách đã chọn (chứa các mã sách được chọn trong form)
            selectedBooksList: [],  // Danh sách sách đầy đủ đã chọn (bao gồm tên sách)
            availableBooks: [],     // Danh sách sách có sẵn
            successMessage: '',
            errorMessage: '',
        };
    },
    mounted() {
        this.fetchAvailableBooks();
    },
    methods: {
        // Mở modal
        openModal() {
            this.isModalOpen = true;
        },

        // Đóng modal
        closeModal() {
            this.isModalOpen = false;
            this.resetForm();
        },

        // Reset form
        resetForm() {
            this.maDocGia = '';
            this.selectedBooks = [];
            this.successMessage = '';
            this.errorMessage = '';
        },

        // Lấy danh sách sách có sẵn
        async fetchAvailableBooks() {
            try {
                const response = await bookService.getAll();
                this.availableBooks = response.data;  // API trả về danh sách sách
            } catch (err) {
                console.error(err);
                this.errorMessage = 'Không thể lấy danh sách sách!';
            }
        },

        // Thêm sách đã chọn vào danh sách
        addSelectedBooks() {
            // Chỉ cần thêm sách mới vào danh sách đã chọn mà không xóa bỏ những sách đã có
            const newBooks = this.availableBooks.filter(book =>
                this.selectedBooks.includes(book.MaSach) && !this.selectedBooksList.some(item => item.MaSach === book.MaSach)
            );
            // Thêm sách mới vào danh sách đã chọn
            this.selectedBooksList.push(...newBooks);
            console.log(this.selectedBooksList);

        },

        // Xóa sách khỏi danh sách đã chọn
        removeBook(maSach) {
            // Xóa mã sách từ selectedBooks
            this.selectedBooks = this.selectedBooks.filter(book => book !== maSach);

            // Xóa sách khỏi selectedBooksList
            this.selectedBooksList = this.selectedBooksList.filter(book => book.MaSach !== maSach);

        },

        // Mượn nhiều sách
        async borrowMultipleBooks() {
            if (this.selectedBooks.length === 0) {
                this.errorMessage = 'Vui lòng chọn ít nhất một cuốn sách!';
                return;
            }
            const danhSachSach = this.selectedBooksList.map(book => ({ maSach: book.MaSach }));


            try {
                const response = await TraCuuService.muonnhieu({
                    maDocGia: this.maDocGia,
                    danhSachSach: danhSachSach
                });

                if (response.data.success) {
                    this.successMessage = 'Mượn sách thành công!';
                    this.closeModal();
                    window.location.reload();  // Đóng modal sau khi mượn thành công
                } else {
                    this.errorMessage = response.data.message || 'Không thể mượn sách!';
                }
            } catch (err) {
                this.errorMessage = 'Không thể mượn sách!';
                console.error(err);
            }
        },
    },
};
</script>

<style scoped>
/* Modal styling */
.modal {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
    margin-top: -120px;
}

.modal-dialog {
    margin: 10% auto;
    max-width: 600px;
}
</style>