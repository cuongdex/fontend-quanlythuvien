import createApiClient from "./api.service";
class BookService {
  constructor(baseUrl = "/api") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    return (await this.api.get("/books")).data;
  }
  async create(data) {
    return (await this.api.post("/book", data));
  }
  async get(id) {
    return (await this.api.get(`/books/${id}`)).data;
  }
  async update(id, data) {
    return (await this.api.put(`/books/${id}`, data)).data;
  }
  async delete(id) {
    return (await this.api.delete(`/books/${id}`));
  }
}
export default new BookService();
