<template>
    <div class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Chỉnh sửa Nhà xuất bản</h5>
                    <button type="button" class="close" @click="closeModal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="saveBook">
                        <div class="form-group">
                            <label for="holot">Họ lót</label>
                            <input type="text" id="HoLot" class="form-control" v-model="editedDocGia.HoLot" required />
                        </div>

                        <div class="form-group">
                            <label for="ten">Tên</label>
                            <input type="text" id="Ten" class="form-control" v-model="editedDocGia.Ten" required />
                        </div>

                        <div class="form-group">
                            <label for="NgaySinh">Ngày Sinh</label>
                            <input type="text" id="NgaySinh" class="form-control" v-model="editedDocGia.NgaySinh" required />
                        </div>

                        <div class="form-group">
                            <label for="Phai">Phái</label>
                            <input type="text" id="Phai" class="form-control" v-model="editedDocGia.Phai" required />
                        </div>

                        <div class="form-group">
                            <label for="DiaChi">Địa Chỉ</label>
                            <input type="text" id="DiaChi" class="form-control" v-model="editedDocGia.DiaChi" required />
                        </div>

                        <div class="form-group">
                            <label for="DienThoai">Điện Thoại</label>
                            <input type="text" id="DienThoai" class="form-control" v-model="editedDocGia.DienThoai" required />
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
        editedDocGia: Object
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
