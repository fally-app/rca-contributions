<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>
          Overall Report
          <v-spacer></v-spacer>
        </v-card-title>
        <v-form ref="form" lazy-validation>
          <v-text-field
            v-model="report.rows"
            :rules="[(v) => !!v || 'First name is required']"
            label="Rows"
            required
          ></v-text-field>

          <v-text-field
            v-model="report.contributors"
            :rules="[(v) => !!v || 'Last name is required']"
            label="Contributors"
            required
          ></v-text-field>

          <v-text-field
            v-model="report.amount"
            :rules="[(v) => !!v || 'Last name is required']"
            label="Amount"
            required
          ></v-text-field>

          <v-divider class="my-5"></v-divider>

          <v-btn color="error" small class="mr-2" @click="deleteReport">
            Delete
          </v-btn>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
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
