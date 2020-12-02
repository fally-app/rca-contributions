<template>
  <div v-if="report" class="edit-form py-3">
    <p class="headline">Overall Report</p>

    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="report.rows"
        label="Number of Contributions"
        required
      ></v-text-field>

      <v-text-field
        v-model="report.contributors"
        label="Contributors"
        required
      ></v-text-field>

      <v-text-field
        v-model="report.amount"
        label="Amount"
        required
      ></v-text-field>

      <v-divider class="my-5"></v-divider>
    </v-form>

    <p class="mt-3">{{ message }}</p>
  </div>

  <div v-else>
    <p>No report</p>
  </div>
</template>

<script>
import ReportDataService from "../../services/ReportDataService";
export default {
  data() {
    return {
      report: null,
    };
  },
  methods: {
    getReport() {
      ReportDataService.getAll()
        .then((response) => {
          this.report = response.data;
          console.log(response.data);
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
  },
  mounted() {
    this.getReport();
    console.log("hey this is report");
  },
};
</script>

<style>
.list {
  max-width: 750px;
}
</style>
