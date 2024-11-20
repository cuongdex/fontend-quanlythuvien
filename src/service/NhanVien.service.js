import createApiClient from "./api.service";
class DocGiaService {
  constructor(baseUrl = "/api") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    return (await this.api.get("/nhanVien")).data;
  }
  async create(data) {
    return (await this.api.post("/nhanVien", data));
  }
  async get(id) {
    return (await this.api.get(`/nhanVien/${id}`)).data;
  }
  async update(id, data) {
    return (await this.api.put(`/nhanVien/${id}`, data)).data;
  }
  async delete(id) {
    return (await this.api.delete(`/nhanVien/${id}`));
  }
}
export default new DocGiaService();
