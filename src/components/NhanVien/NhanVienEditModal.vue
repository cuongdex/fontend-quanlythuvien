<template>
    <div class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Chỉnh sửa Nhân Viên</h5>
                    <button type="button" class="close" @click="closeModal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="saveBook">
                        <div class="form-group">
                            <label for="holot">Họ Tên</label>
                            <input type="text" id="HoLot" class="form-control" v-model="editedNhanVien.HoTenNV" required />
                        </div>

                        <div class="form-group">
                            <label for="ten">Mật Khẩu</label>
                            <input type="password" id="Ten" class="form-control" v-model="editedNhanVien.Password" required />
                        </div>

                        <div class="form-group">
                            <label for="NgaySinh">Chức Vụ</label>
                            <input type="text" id="NgaySinh" class="form-control" v-model="editedNhanVien.ChucVu" required />
                        </div>


                        <div class="form-group">
                            <label for="DiaChi">Địa Chỉ</label>
                            <input type="text" id="DiaChi" class="form-control" v-model="editedNhanVien.DiaChi" required />
                        </div>

                        <div class="form-group">
                            <label for="DienThoai">Điện Thoại</label>
                            <input type="text" id="DienThoai" class="form-control" v-model="editedNhanVien.SoDienThoai" required />
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
        editedNhanVien: Object
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
    margin-top: -120px;
}

.modal-dialog {
    margin: 10% auto;
    max-width: 600px;
}
</style>
