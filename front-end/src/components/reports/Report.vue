<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>
          Overall Report
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="reports" :search="search">
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2">mdi-pencil</v-icon>
            <v-icon small @click="deleteReport(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>

        <v-card-actions v-if="reports.length > 0">
          <v-btn small color="error" @click="removeAllReports">
            Remove All
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import ReportDataService from "../../services/ReportDataService";
export default {
  name: "reports",
  data() {
    return {
      reports: [],
      rows: "",
      search: "",
      headers: [
        { text: "Number", align: "start", sortable: true, value: "rows" },
        { text: "Amount", value: "amount", sortable: true },
        { text: "Contributors", value: "contributors", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    retrieveReports() {
      ReportDataService.getAll()
        .then((response) => {
          this.reports = response.data.map(this.getDisplayReport);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveReports();
    },

    removeAllReports() {
      ReportDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteReport(id) {
      ReportDataService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getDisplayReport(report) {
      return {
        id: report._id,
        amount:
          report.fname.length > 30
            ? report.fname.substr(0, 30) + "..."
            : report.fname,
        contributors:
          report.lname.length > 30
            ? report.lname.substr(0, 30) + "..."
            : report.lname,

        rows:
          report.gender.length > 30
            ? report.gender.substr(0, 30) + "..."
            : report.gender,
      };
    },
  },
  mounted() {
    this.retrieveReports();
  },
};
</script>

<style>
.list {
  max-width: 750px;
}
</style>
