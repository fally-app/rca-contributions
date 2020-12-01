import http from "../http-common";

class TypeDataService {
  getAll() {
    return http.get("/types");
  }

  get(id) {
    return http.get(`/types/${id}`);
  }

  create(data) {
    return http.post("/types", data);
  }

  update(id, data) {
    return http.put(`/types/${id}`, data);
  }

  delete(id) {
    return http.delete(`/types/${id}`);
  }

  // deleteAll() {
  //   return http.delete(`/types`);
  // }

  // findByTitle(title) {
  //   return http.get(`/types?title=${title}`);
  // }
}

export default new TypeDataService();
