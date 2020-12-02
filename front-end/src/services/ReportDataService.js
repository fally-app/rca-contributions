import http from "../http-common";

class ReportDataService {
  getAll() {
    return http.get("/report");
  }
}
export default new ReportDataService();
