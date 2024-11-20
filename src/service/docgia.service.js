import createApiClient from "./api.service";
class DocGiaService {
  constructor(baseUrl = "/api") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    return (await this.api.get("/DocGia")).data;
  }
  async create(data) {
    return (await this.api.post("/DocGia", data));
  }
  async get(id) {
    return (await this.api.get(`/DocGia/${id}`)).data;
  }
  async update(id, data) {
    return (await this.api.put(`/DocGia/${id}`, data)).data;
  }
  async delete(id) {
    return (await this.api.delete(`/DocGia/${id}`));
  }
}
export default new DocGiaService();
