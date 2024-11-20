import createApiClient from "./api.service";
class TraCuuService {
  constructor(baseUrl = "/api") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    return (await this.api.get("/lay")).data;
  }
  async muon() {
    return (await this.api.post("/muon"));
  }
  async tra(data) {
    return (await this.api.post("/tra", data));
  }
  async muonnhieu(data) {
    return (await this.api.post("/muon-nhieu-sach", data));
  }
  async tracuu(id) {
    return (await this.api.get(`/tracuu/${id}`)).data;
  }
}
export default new TraCuuService();
