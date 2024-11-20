<template>
    <!-- Modal Đăng Xuất -->
    <div v-if="showModal" class="modal fade show" style="display: block;" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="logoutModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="logoutModalLabel">Đăng xuất</h5>
            <button type="button" class="close" @click="closeModal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">Bạn có chắc chắn muốn đăng xuất?</div>
          <div class="modal-footer">
            <button class="btn btn-secondary" type="button" @click="closeModal">Hủy</button>
            <button class="btn btn-primary" type="button" @click="handleLogout">Đăng xuất</button>
          </div>
        </div>
      </div>
    </div>
  
    <!-- Backdrop -->
    <div v-if="showModal" class="modal-backdrop fade show" @click="closeModal"></div>
  </template>
  
  <script>
  export default {
    name: 'LogoutModal',
    data() {
      return {
        showModal: false,  // Trạng thái để điều khiển việc hiển thị modal
      };
    },
    methods: {
      openModal() {
        this.showModal = true;  // Mở modal
      },
      closeModal() {
        this.showModal = false;  // Đóng modal
      },
      handleLogout() {
        // Xóa token và tên người dùng khỏi localStorage
        localStorage.removeItem('userToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('ChucVu');

        
        // Chuyển hướng người dùng về trang đăng nhập
        this.$router.push('/'); // Dùng Vue Router để chuyển hướng
        
        // Đóng modal sau khi đăng xuất
        this.closeModal(); // Đóng modal
      }
    }
  };
  </script>
  
  <style scoped>
  .modal {
    z-index: 1050;
  }
  
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5); /* Màu nền tối */
    z-index: 1040;
  }
  </style>
  