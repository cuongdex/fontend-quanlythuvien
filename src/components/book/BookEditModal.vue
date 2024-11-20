<template>
    <div class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Chỉnh sửa Sách</h5>
                    <button type="button" class="close" @click="closeModal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="saveBook">
                        <div class="form-group">
                            <label for="TenSach">Tên Sách</label>
                            <input type="text" id="TenSach" class="form-control" v-model="editedBook.TenSach" required />
                        </div>

                        <div class="form-group">
                            <label for="TacGia">Tác Giả</label>
                            <input type="text" id="TacGia" class="form-control" v-model="editedBook.TacGia" required />
                        </div>

                        <div class="form-group">
                            <label for="DonGia">Giá</label>
                            <input type="number" id="DonGia" class="form-control" v-model="editedBook.DonGia" required />
                        </div>

                        <div class="form-group">
                            <label for="NamXuatBan">Năm Xuất Bản</label>
                            <input type="number" id="NamXuatBan" class="form-control" v-model="editedBook.NamXuatBan" required />
                        </div>

                        <div class="form-group">
                            <label for="SoQuyen">Số Lượng</label>
                            <input type="number" id="SoQuyen" class="form-control" v-model="editedBook.SoQuyen" required />
                        </div>

                        <button type="submit" class="btn btn-primary">Lưu</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        editedBook: Object
    },

    methods: {
        closeModal() {
            this.$emit('close');
        },
        saveBook() {
            this.$emit('save');
        }
    }
};
</script>

<style scoped>
/* Modal Styling */
.modal {
    display: block;
    /* Hiển thị modal */
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
    margin-top: -50px;
}

.modal-dialog {
    margin: 10% auto;
    max-width: 600px;
}
</style>
