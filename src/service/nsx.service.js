import createApiClient from "./api.service";
class NSXService {
  constructor(baseUrl = "/api") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    return (await this.api.get("/nhaXuatBan")).data;
  }
  async create(data) {
    return (await this.api.post("/nhaXuatBan", data));
  }
  async get(id) {
    return (await this.api.get(`/nhaXuatBan/${id}`)).data;
  }
  async update(id, data) {
    return (await this.api.put(`/nhaXuatBan/${id}`, data)).data;
  }
  async delete(id) {
    return (await this.api.delete(`/nhaXuatBan/${id}`));
  }
}
export default new NSXService();
