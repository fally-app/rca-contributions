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
  idToPrimary(data) {
    data.forEach((dname) => {
      dname.member_id = http.get(`/members/${dname.member_id}`).fname;
    });
    return data;
  }

  // deleteAll() {
  //   return http.delete(`/members`);
  // }

  // findByTitle(title) {
  //   return http.get(`/members?title=${title}`);
  // }
}

export default new ContributionDataService();
