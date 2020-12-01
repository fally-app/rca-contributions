<template>
  <div class="submit-form mt-3 mx-auto">
    <p class="headline">Add Contribution</p>

    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="contribution.member_id"
          :rules="[(v) => !!v || 'Member is required']"
          label="Member"
          required
        ></v-text-field>

        <v-text-field
          v-model="contribution.c_type_id"
          :rules="[(v) => !!v || 'Type is required']"
          label="Type"
          required
        ></v-text-field>
        <v-text-field
          v-model="contribution.amount"
          :rules="[(v) => !!v || 'Amount is required']"
          label="Amount"
          required
        ></v-text-field>
<!-- 
         <v-select
        v-model="contribution.gender"
        :items="selects"
        label="Gender"
      ></v-select> -->
      </v-form>

      <v-btn color="primary" class="mt-3" @click="saveContribution">Submit</v-btn>
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-card-title>
          Submitted successfully!
        </v-card-title>

        <v-card-subtitle>
          Click the button to add new member.
        </v-card-subtitle>

        <v-card-actions>
          <v-btn color="success" @click="newContribution">Add</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import ContributionDataService from "../../services/ContributionDataService";

export default {
  name: "add-contribution",
  data() {
    return {
      contribution: {
        id: "",
        member_id: "",
        c_type_id: "",
        amount: "",
      },
      submitted: false,
    };
  },
  methods: {
    saveContribution() {
      var data = {
        member_id: this.contribution.member_id,
        c_type_id: this.contribution.c_type_id,
        amount: this.contribution.amount,
      };

      ContributionDataService.create(data)
        .then((response) => {
          this.contribution.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newContribution() {
      this.submitted = false;
      this.contribution = {};
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
}
</style>