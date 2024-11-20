<template>
  <div class="them" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title">Thêm Đọc Giả</h5>
                  <button type="button" class="close" @click="closeModaladd" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
              </div>
              <div class="modal-body">
                  <form @submit.prevent="saveBookadd">
                    <div class="form-group">
                          <label for="madocgia">Mã Đọc Giả</label>
                          <input type="text" id="madocgia" class="form-control" v-model="newnxb.MaDocGia" required />
                      </div>
                      <div class="form-group">
                          <label for="holot">Họ Lót</label>
                          <input type="text" id="holot" class="form-control" v-model="newnxb.HoLot" required />
                      </div>
                      <div class="form-group">
                          <label for="Ten">Tên</label>
                          <input type="text" id="Ten" class="form-control" v-model="newnxb.Ten" required />
                      </div>
                      <div class="form-group">
                          <label for="Phai">Phái</label>
                          <input type="text" id="Phai" class="form-control" v-model="newnxb.Phai" required />
                      </div>

                      <div class="form-group">
                          <label for="NgaySinh">Ngày Sinh</label>
                          <input type="date" id="NgaySinh" class="form-control" v-model="newnxb.NgaySinh" required />
                      </div>

                      <div class="form-group">
                          <label for="DiaChi">Địa Chỉ</label>
                          <input type="text" id="DiaChi" class="form-control" v-model="newnxb.DiaChi" required />
                      </div>
                      <div class="form-group">
                          <label for="DienThoai">Điện Thoại</label>
                          <input type="text" id="DienThoai" class="form-control" v-model="newnxb.DienThoai" required />
                      </div>
                      <!-- Hiển thị thông báo lỗi hoặc thành công -->
                      <div v-if="errorMessage" class="alert alert-danger">
                        {{ errorMessage }}
                      </div>
                      <div v-if="successMessage" class="alert alert-success">
                        {{ successMessage }}
                      </div>

                      <button type="submit" class="btn btn-primary">Lưu</button>
                  </form>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import docgiaService from '@/service/docgia.service';

export default {
  data() {
    return {
      newnxb: {
        MaDocGia: '',
        HoLot: '',
        Ten: '',
        Phai:"",
        NgaySinh:"",
        DiaChi:"",
        DienThoai:"",
      },
      errorMessage: '',  // Lưu thông báo lỗi
      successMessage: '', // Lưu thông báo thành công
    };
  },
  methods: {
    // Phương thức gọi API hoặc xử lý thêm sách
    async saveBookadd() {
      this.errorMessage = '';  // Reset lỗi cũ
      this.successMessage = '';  // Reset thông báo thành công


      try {

        await docgiaService.create(this.newnxb);

        // Hiển thị thông báo thành công
        this.successMessage = 'Thêm Đọc Giả thành công!';

        // Reset form sau khi lưu thành công
        this.resetForm();
      } catch (err) {
        console.error("Không thể thêm Đọc Giả:", err);
        // Hiển thị thông báo lỗi nếu có
        this.errorMessage = "Không thể thêm đọc giả mới!";
      }
    },
    resetForm() {
      // Reset form sau khi thêm sách
      this.newnxb = {
        MaDocGia: '',
        HoLot: '',
        Ten: '',
        Phai:"",
        NgaySinh:"",
        DiaChi:"",
        DienThoai:"",
      };
    },
    closeModaladd() {
      // Đóng modal khi người dùng bấm nút close
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.them {
  margin-top: 0px;
  z-index: 100;
}
.form-group {
  margin: 6px 0;
}
.alert {
  margin-top: 10px;
}

.modal-content{
  margin-top: -50px;
}
</style>
