// src/router.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/components/Home.vue"; // Đảm bảo các đường dẫn đúng
import BookListContainer from "@/components/book/BookListContainer.vue";
import AddBookPage from "@/views/AddBookPage.vue";
import NSXListContainer from "@/components/NSX/NSXListContainer.vue";
import AddNXB from "@/components/NSX/AddNXB.vue";
import DocGiaListContainer from "@/components/DocGia/DocGiaListContainer.vue";
import AddDocGia from "@/components/DocGia/AddDocGia.vue";
import NhanVienListContainer from "@/components/NhanVien/NhanVienListContainer.vue";
import AddNhanVien from "@/components/NhanVien/AddNhanVien.vue";
import TraCuuListContainer from "@/components/TheoDoi/TraCuuListContainer.vue";
import MuonSach from "@/components/TheoDoi/MuonSach.vue";
import login from "@/components/login.vue";
import dashboard from "@/components/dashboard.vue";
import AppHeader from "@/components/AppHeader.vue";
const routes = [
  { path: "/", name: "Login", component: login },
  {
    path: "/dashboard",
    component: AppHeader,
    children: [
      {
        path: "",
        name: "Home",
        component: Home,
      },
      {
        path: "list",
        name: "list",
        component: BookListContainer,
      },
      {
        path: "/add-book",
        name: "AddBookPage",
        component: AddBookPage,
      },
      {
        path: "/list-nsx",
        name: "list-nsx",
        component: NSXListContainer,
      },
      {
        path: "/add-nxb",
        name: "AddNXB",
        component: AddNXB,
      },
      {
        path: "/list-DocGia",
        name: "list-DocGia",
        component: DocGiaListContainer,
      },
      {
        path: "/add-DocGia",
        name: "AddDocGia",
        component: AddDocGia,
      },
      {
        path: "/list-NhanVien",
        name: "list-NhanVien",
        component: NhanVienListContainer,
      },
      {
        path: "/add-NhanVien",
        name: "AddNhanVien",
        component: AddNhanVien,
      },
      {
        path: "/list-TraCuu",
        name: "list-TraCuu",
        component: TraCuuListContainer,
      },
      {
        path: "/muon",
        name: "muon",
        component: MuonSach,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
