import createApiClient from "./api.service";
class BookService {
  constructor(baseUrl = "/api") {
    this.api = createApiClient(baseUrl);
  }
  async login(data) {
    return (await this.api.post("/login", data));
  }

}
export default new BookService();
