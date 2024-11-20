<template>
    <div class="bg-gradient-primary">
      <div class="container">
        <!-- Outer Row -->
        <div class="row justify-content-center">
          <div class="col-xl-10 col-lg-12 col-md-9">
            <div class="card o-hidden border-0 shadow-lg my-5">
              <div class="card-body p-0">
                <!-- Nested Row within Card Body -->
                <div class="row">
                  <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                  <div class="col-lg-6">
                    <div class="p-5">
                      <div class="text-center">
                        <h1 class="h4 text-gray-900 mb-4">Chào mừng bạn quay lại!</h1>
                      </div>
                      <form class="user" @submit.prevent="handleLogin">
                        <div class="form-group">
                          <input
                            type="text"
                            class="form-control form-control-user"
                            v-model="email"
                            placeholder="Nhập địa chỉ Email..."
                          />
                        </div>
                        <div class="form-group">
                          <input
                            type="password"
                            class="form-control form-control-user"
                            v-model="password"
                            placeholder="Mật khẩu"
                          />
                        </div>
                        <div class="form-group">
                          <div class="custom-control custom-checkbox small">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="customCheck"
                              v-model="rememberMe"
                            />
                            <label class="custom-control-label" for="customCheck">
                              Ghi nhớ tôi
                            </label>
                          </div>
                        </div>
                        <button type="submit" class="btn btn-primary btn-user btn-block">
                          Đăng nhập
                        </button>
                      </form>
                      <div v-if="errorMessage" class="alert alert-danger mt-3">
                        {{ errorMessage }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import loginService from '@/service/login.service';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        rememberMe: false,
        errorMessage: '',
      };
    },
    methods: {
      async handleLogin() {
        // Clear previous error
        this.errorMessage = '';
  
        try {
          // Gọi dịch vụ đăng nhập
          const response = await loginService.login({
            MSNV: this.email,
            Password: this.password,
          });
          
          console.log(response.data.data.name);
          
          if (response.status === 200) {
            // Lưu token hoặc dữ liệu người dùng, ví dụ trong localStorage hoặc Vuex
            localStorage.setItem('userToken', response.data.data.name);
            localStorage.setItem('ChucVu', response.data.data.chucvu);

            // Chuyển hướng sau khi đăng nhập thành công
            window.location.href = '/dashboard';
          } else {
            this.errorMessage = 'Thông tin đăng nhập không hợp lệ. Vui lòng thử lại.';
          }
        } catch (error) {
          this.errorMessage = 'Đã xảy ra lỗi. Vui lòng thử lại sau.';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Thêm các kiểu CSS tùy chỉnh nếu cần */
  </style>
  