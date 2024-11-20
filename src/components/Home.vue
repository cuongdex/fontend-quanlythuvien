<template>
    <!-- Begin Page Content -->
    <div class="container-fluid">
        <!-- Page Heading -->
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
        </div>

        <!-- Content Row -->
        <div class="row">
            <!-- Số Lượng Sách -->
            <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-left-primary shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                    Số Lượng Sách
                                </div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800">{{ bookCount }}</div>
                            </div>
                            <div class="col-auto">
                                <i class="fas fa-book fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Số Lượng Độc Giả -->
            <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-left-success shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                    Số Lượng Độc Giả
                                </div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800">{{ readerCount }}</div>
                            </div>
                            <div class="col-auto">
                                <i class="fas fa-user fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Số Lượng Nhà Xuất Bản -->
            <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-left-success shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                    Số Lượng Nhà Xuất Bản
                                </div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800">{{ publisherCount }}</div>
                            </div>
                            <div class="col-auto">
                                <i class="fas fa-user fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Số Lượng Sách Đang Mượn -->
            <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-left-warning shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                    Số Lượng Sách Được Mượn
                                </div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800">{{ borrowedBookCount }}</div>
                            </div>
                            <div class="col-auto">
                                <i class="fas fa-book fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import bookService from '@/service/book.service';
import docgiaService from '@/service/docgia.service';
import TraCuuService from '@/service/TraCuu.service';
import nsxService from '@/service/nsx.service';

export default {
    name: "DashboardCards",
    data() {
        return {
            bookCount: 0,
            readerCount: 0,
            publisherCount: 0,
            borrowedBookCount: 0
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                // Fetching data from the services
                const bookData = await bookService.getAll();
                const readerData = await docgiaService.getAll();
                const publisherData = await nsxService.getAll();
                const borrowedBooksData = await TraCuuService.getAll();

                // Assuming each service returns an array, so using .length
                
                this.bookCount = bookData.data.length;  // Get the length of the array
                this.readerCount = readerData.data.length;
                this.publisherCount = publisherData.data.data.length;
                this.borrowedBookCount = borrowedBooksData.data.length;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }
};
</script>


<style scoped>
/* Add custom styles here if needed */
</style>
