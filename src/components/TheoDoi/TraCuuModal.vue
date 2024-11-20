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
                            <label for="madocgia">Mã đọc giả</label>
                            <input type="text" id="madocgia" class="form-control" v-model="editedList.maDocGia" required />
                        </div>

                        <div class="form-group">
                            <label for="ten">Tên đọc giả</label>
                            <input type="text" id="ten" class="form-control" v-model="Ten[0]" required />
                        </div>

                        <div class="form-group">
                            <label for="ten">Ngày Mượn</label>
                            <input type="text" id="Ten" class="form-control" v-model="editedList.ngayMuon" required />
                        </div>

                        <div class="form-group">
                            <label for="tien">Tổng giá tiền</label>
                            <input type="text" id="tien" class="form-control" v-model="this.data.tongTienMuon" required />
                        </div>

                        <button type="submit" class="btn btn-primary">Trả Sách</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TraCuuService from '@/service/TraCuu.service';
export default {
    props: {
        editedList: Object,
        Ten: Object
    },
    data() {
        return {
            data: []
        };
    },

    mounted(){
        // console.log(this.editedList.data);
        this.fetchdata()
        
    },  

    methods: {
        async fetchdata() {
            try {
                const response = await TraCuuService.tracuu(this.editedList.maDocGia);  // Make sure this API returns an object with a 'data' array
                this.data = response; 
                
            } catch (err) {
                this.error = 'Failed to fetch books. Please try again later.';
            } finally {
                this.loading = false;
            }
        },

        closeModal() {
            this.$emit('close');
        },
        saveBook() {
            this.$emit('save');
        },
        
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
