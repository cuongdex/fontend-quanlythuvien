<template>
  <div class="them" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title">Thêm Nhân Viên</h5>
                  <button type="button" class="close" @click="closeModaladd" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
              </div>
              <div class="modal-body">
                  <form @submit.prevent="saveBookadd">
                    <div class="form-group">
                          <label for="madocgia">Mã Nhân Viên</label>
                          <input type="text" id="madocgia" class="form-control" v-model="newnxb.MSNV" required />
                      </div>
                      <div class="form-group">
                          <label for="holot">Họ Tên</label>
                          <input type="text" id="holot" class="form-control" v-model="newnxb.HoTenNV" required />
                      </div>
                      <div class="form-group">
                          <label for="Ten">Chức Vụ</label>
                          <input type="text" id="Ten" class="form-control" v-model="newnxb.ChucVu" required />
                      </div>

                      <div class="form-group">
                          <label for="DiaChi">Địa Chỉ</label>
                          <input type="text" id="DiaChi" class="form-control" v-model="newnxb.DiaChi" required />
                      </div>
                      <div class="form-group">
                          <label for="DienThoai">Điện Thoại</label>
                          <input type="text" id="DienThoai" class="form-control" v-model="newnxb.SoDienThoai" required />
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
import NhanVienService from '@/service/NhanVien.service';

export default {
  data() {
    return {
      newnxb: {
        MSNV: '',
        HoTenNV: '',
        Password: 'password123',
        ChucVu :"",
        DiaChi:"",
        SoDienThoai:"",
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

        await NhanVienService.create(this.newnxb);

        // Hiển thị thông báo thành công
        this.successMessage = 'Thêm Nhân Viên thành công!';

        // Reset form sau khi lưu thành công
        this.resetForm();
      } catch (err) {
        console.error("Không thể thêm Nhân Viên:", err);
        // Hiển thị thông báo lỗi nếu có
        this.errorMessage = "Không thể thêm nhân viên mới!";
      }
    },
    resetForm() {
      // Reset form sau khi thêm sách
      this.newnxb = {
        MSNV: '',
        HoTenNV: '',
        Password: 'password123',
        ChucVu :"",
        DiaChi:"",
        SoDienThoai:"",
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
  margin-top: -20px;
}
</style>
