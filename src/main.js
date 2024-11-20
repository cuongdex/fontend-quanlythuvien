// Import các file CSS
import './assets/main.css';
import './assets/sb-admin-2.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
  // This includes Popper.js and jQuery

// Import các file JS cho DataTables

import './assets/vendor/jquery/jquery.min.js';
import './assets/vendor/datatables/jquery.dataTables.js';
import './assets/vendor/datatables/dataTables.bootstrap4.js';
import './assets/js/demo/datatables-demo.js';

// Tạo ứng dụng Vue
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

createApp(App).use(router).mount("#app");
