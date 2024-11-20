<template>
  <div class="them" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title">Thêm Sách</h5>
                  <button type="button" class="close" @click="closeModaladd" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
              </div>
              <div class="modal-body">
                  <form @submit.prevent="saveBookadd">
                    <div class="form-group">
                          <label for="MaSach">Mã Sách</label>
                          <input type="text" id="MaSach" class="form-control" v-model="newBook.MaSach" required />
                      </div>
                      <div class="form-group">
                          <label for="TenSach">Tên Sách</label>
                          <input type="text" id="TenSach" class="form-control" v-model="newBook.TenSach" required />
                      </div>

                      <div class="form-group">
                          <label for="TacGia">Tác Giả</label>
                          <input type="text" id="TacGia" class="form-control" v-model="newBook.TacGia" required />
                      </div>

                      <div class="form-group">
                          <label for="DonGia">Giá</label>
                          <input type="number" id="DonGia" class="form-control" v-model="newBook.DonGia" required />
                      </div>

                      <div class="form-group">
                          <label for="NamXuatBan">Năm Xuất Bản</label>
                          <input type="number" id="NamXuatBan" class="form-control" v-model="newBook.NamXuatBan" required />
                      </div>
                      <div class="form-group">
                          <label for="NamXuatBan">Mã Xuất Bản</label>
                          <input type="text" id="NamXuatBan" class="form-control" v-model="newBook.MaNXB" required />
                      </div>


                      <div class="form-group">
                          <label for="SoQuyen">Số Lượng</label>
                          <input type="number" id="SoQuyen" class="form-control" v-model="newBook.SoQuyen" required />
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
import BookService from "@/service/book.service";
export default {
  data() {
    return {
      newBook: {
        MaSach: '',
        TenSach: '',
        TacGia: '',
        DonGia: null,
        NamXuatBan: null,
        MaNXB:"",
        SoQuyen: null,
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

      // Kiểm tra dữ liệu nhập vào có hợp lệ không
      if (!this.newBook.MaSach || !this.newBook.TenSach || !this.newBook.TacGia || !this.newBook.DonGia || !this.newBook.NamXuatBan || !this.newBook.SoQuyen) {
        this.errorMessage = 'Vui lòng điền đầy đủ thông tin.';
        return;
      }

      try {
        // Gọi API thêm sách
        console.log(this.newBook);
        
        await BookService.create(this.newBook);

        // Hiển thị thông báo thành công
        this.successMessage = 'Thêm sách thành công!';

        // Reset form sau khi lưu thành công
        this.resetForm();
      } catch (err) {
        console.error("Không thể thêm sách:", err);
        // Hiển thị thông báo lỗi nếu có
        this.errorMessage = "Không thể thêm sách mới!";
      }
    },
    resetForm() {
      // Reset form sau khi thêm sách
      this.newBook = {
        MaSach: '',
        TenSach: '',
        TacGia: '',
        DonGia: null,
        NamXuatBan: null,
        SoQuyen: null,
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
  margin-top: -100px;
  z-index: 100;
}
.form-group {
  margin: 6px 0;
}
.alert {
  margin-top: 10px;
}
</style>
