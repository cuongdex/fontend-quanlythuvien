<template>
  <div id="app" class="d-flex flex-column h-100">
    <!-- Navbar -->
    <nav class="navbar navbar-expand navbar-light bg-white topbar shadow">
      <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
        <i class="fa fa-bars"></i>
      </button>
      <ul class="navbar-nav ml-auto">
        <div class="topbar-divider d-none d-sm-block"></div>
        <li class="nav-item dropdown no-arrow">
          <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
            <span class="mr-2 d-none d-lg-inline text-gray-600 small">Chào Mừng, {{ userName }}</span>
            <img class="img-profile rounded-circle" alt="profile" src="../assets/img/undraw_profile.svg">
          </a>
          <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
            <a class="dropdown-item" href="#">
              <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
              Profile
            </a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" @click="openModal">
              <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
              Logout
            </a>
          </div>
        </li>
      </ul>
    </nav>

    <div class="d-flex flex-grow-1">
      <!-- Sidebar -->
      <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
        <a class="sidebar-brand d-flex align-items-center justify-content-center" href="#">
          <div class="sidebar-brand-icon rotate-n-15">
            <i class="fas fa-laugh-wink"></i>
          </div>
          <div class="sidebar-brand-text mx-3">Quản Lý Thư Viện <sup>2</sup></div>
        </a>

        <hr class="sidebar-divider my-0">
        <li class="nav-item">
          <a class="nav-link" href="/dashboard">
            <i class="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </a>
        </li>
        <hr class="sidebar-divider">
        <div class="sidebar-heading"></div>
        <li class="nav-item">
          <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true"
            aria-controls="collapseTwo">
            <span>Sách</span>
          </a>
          <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
            <div class="bg-white py-2 collapse-inner rounded">
              <h6 class="collapse-header">Quản Lý Sách:</h6>
              <a class="collapse-item" href="/add-book">Thêm</a>
              <a class="collapse-item" href="dashboard/list">Danh Sách</a>

            </div>
          </div>
        </li>
        <li class="nav-item">
          <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
            aria-expanded="true" aria-controls="collapseUtilities">
            <span>Nhà Sản Xuất</span>
          </a>
          <div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities"
            data-parent="#accordionSidebar">
            <div class="bg-white py-2 collapse-inner rounded">
              <h6 class="collapse-header">Quản lý nhà xuất bản</h6>
              <a class="collapse-item" href="/add-nxb">Thêm</a>
              <a class="collapse-item" href="/list-nsx">Danh Sách</a>
            </div>
          </div>
        </li>

        <li class="nav-item">
          <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseReaders"
            aria-expanded="true" aria-controls="collapseReaders">
            <span>Đọc Giả</span>
          </a>
          <div id="collapseReaders" class="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
            <div class="bg-white py-2 collapse-inner rounded">
              <h6 class="collapse-header">Quản lý Đọc Giả</h6>
              <a class="collapse-item" href="/add-DocGia">Thêm</a>
              <a class="collapse-item" href="/list-DocGia">Danh Sách</a>
            </div>
          </div>
        </li>

        <!-- Conditionally render "Nhân Viên" menu based on user role -->
        <li v-if="userRole !== 'Nhân Viên'" class="nav-item">
          <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapnhanvien"
            aria-expanded="true" aria-controls="collapnhanvien">
            <span>Nhân Viên</span>
          </a>
          <div id="collapnhanvien" class="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
            <div class="bg-white py-2 collapse-inner rounded">
              <h6 class="collapse-header">Quản lý Nhân Viên</h6>
              <a class="collapse-item" href="/add-NhanVien">Thêm</a>
              <a class="collapse-item" href="/list-NhanVien">Danh Sách</a>
            </div>
          </div>
        </li>

        <li class="nav-item">
          <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapTheoDoi"
            aria-expanded="true" aria-controls="collapTheoDoi">
            <span>Theo Dõi Mượn Sách</span>
          </a>
          <div id="collapTheoDoi" class="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
            <div class="bg-white py-2 collapse-inner rounded">
              <h6 class="collapse-header">Quản lý</h6>
              <a class="collapse-item" href="/list-TraCuu">Tra Cứu</a>
            </div>
          </div>
        </li>
        <LogoutModal ref="logoutModal" />
      </ul>
      <!-- Main Content -->
      <div class="flex-grow-1 bg-light p-4">
        <!-- <Home/> -->
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import LogoutModal from '@/components/LogoutModal.vue';
export default {
  components: {
    LogoutModal,  // Register the LogoutModal component
  },
  data() {
    return {
      userName: '',
      userRole: ''  // Add userRole property
    };
  },
  created() {
    // Retrieve the user's role from localStorage (or wherever it is stored)
    const storedUserName = localStorage.getItem('userToken');
    const storedUserRole = localStorage.getItem('ChucVu'); // Assuming role is stored in localStorage as well
    if (storedUserName) {
      this.userName = storedUserName;
    } else {
      this.userName = 'Người dùng'; // Default if not found
    }
    if (storedUserRole) {
      this.userRole = storedUserRole; // Default to "employee" or other role if not found
    } else {
      this.userRole = 'employee'; // Default role if none is found
    }
  },
  methods: {
    openModal() {
      this.$refs.logoutModal.openModal(); // Open modal from component LogoutModal
    }
  }
};
</script>


<style>
#app {
  height: 100vh;
}

.sidebar {
  height: 100vh;
  overflow-y: auto;
  /* margin-top: -50px; */
  /* position: absolute; */
  z-index: 10;
}

.flex-grow-1 {
  overflow-y: auto;
}
</style>