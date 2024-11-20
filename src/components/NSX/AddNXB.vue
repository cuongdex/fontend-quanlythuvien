<template>
  <div class="them" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title">Thêm Nhà Xuất Bản</h5>
                  <button type="button" class="close" @click="closeModaladd" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
              </div>
              <div class="modal-body">
                  <form @submit.prevent="saveBookadd">
                    <div class="form-group">
                          <label for="MaSach">Mã NXB</label>
                          <input type="text" id="MaSach" class="form-control" v-model="newnxb.MaNXB" required />
                      </div>
                      <div class="form-group">
                          <label for="TenSach">Tên NXB</label>
                          <input type="text" id="TenSach" class="form-control" v-model="newnxb.TenNXB" required />
                      </div>

                      <div class="form-group">
                          <label for="TacGia">Địa Chỉ</label>
                          <input type="text" id="TacGia" class="form-control" v-model="newnxb.DiaChi" required />
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
import NSXService from "@/service/nsx.service";

export default {
  data() {
    return {
      newnxb: {
        MaNXB: '',
        TenNXB: '',
        DonGia: '',
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

        await NSXService.create(this.newnxb);

        // Hiển thị thông báo thành công
        this.successMessage = 'Thêm nhà xuất bản thành công!';

        // Reset form sau khi lưu thành công
        this.resetForm();
      } catch (err) {
        console.error("Không thể thêm sách:", err);
        // Hiển thị thông báo lỗi nếu có
        this.errorMessage = "Không thể thêm nhà xuất bản mới!";
      }
    },
    resetForm() {
      // Reset form sau khi thêm sách
      this.newnxb = {
        MaSach: '',
        TenSach: '',
        TacGia: '',
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
</style>
