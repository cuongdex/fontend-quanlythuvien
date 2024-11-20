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
                            <label for="TenSach">Tên Nhà xuất bản</label>
                            <input type="text" id="TenSach" class="form-control" v-model="editednsx.TenNXB" required />
                        </div>

                        <div class="form-group">
                            <label for="TacGia">Địa Chỉ</label>
                            <input type="text" id="TacGia" class="form-control" v-model="editednsx.DiaChi" required />
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
        editednsx: Object
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

.modal-dialog {
    margin: 10% auto;
    max-width: 600px;
}
</style>
