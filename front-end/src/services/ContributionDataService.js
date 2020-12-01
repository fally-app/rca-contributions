import http from "../http-common";

class ContributionDataService {
  getAll() {
    return http.get("/contributions");
  }

  get(id) {
    return http.get(`/contributions/${id}`);
  }

  create(data) {
    return http.post("/contributions", data);
  }

  update(id, data) {
    return http.put(`/contributions/${id}`, data);
  }

  delete(id) {
    return http.delete(`/contributions/${id}`);
  }

  // deleteAll() {
  //   return http.delete(`/members`);
  // }

  // findByTitle(title) {
  //   return http.get(`/members?title=${title}`);
  // }
}

export default new ContributionDataService();
