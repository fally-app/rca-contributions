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

        <v-menu
          v-model="fromDateMenu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              label="Date"
              readonly
              :value="fromDateDisp"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            locale="en-in"
            v-model="fromDateVal"
            no-title
            @input="fromDateMenu = false"
            :min="minDate"
          ></v-date-picker>
        </v-menu>

        <v-select
          v-model="contribution.member_id"
          :items="members"
          label="Member"
        ></v-select>
      </v-form>

      <v-btn color="primary" class="mt-3" @click="saveContribution"
        >Submit</v-btn
      >
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-card-title> Submitted successfully! </v-card-title>

        <v-card-subtitle> Click the button to add new member. </v-card-subtitle>

        <v-card-actions>
          <v-btn color="success" @click="newContribution">Add</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import ContributionDataService from "../../services/ContributionDataService";
import MemberDataService from "../../services/MemberDataService";

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
      members: [],
      submitted: false,
      fromDateMenu: false,
      fromDateVal: null,
      minDate: "2020-01-05",
      maxDate: "2019-08-30",
    };
  },
  computed: {
    fromDateDisp() {
      return this.fromDateVal;
      // format/do something with date
    },
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
    retrieveMembers() {
      MemberDataService.getAll()
        .then((response) => {
          const returns = response.data;
          returns.forEach((element) => {
            this.members.push(element.fname);
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveMembers();
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
}
</style>