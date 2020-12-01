<template>
  <div class="submit-form mt-3 mx-auto">
    <p class="headline">Add Contribution</p>

    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-select
          v-model="contribution.member_id"
          :items="members"
          item-value="id"
          item-text="fname"
          label="Member"
        ></v-select>

        <v-select
          v-model="contribution.c_type_id"
          :items="types"
          item-value="_id"
          item-text="title"
          label="Type"
        ></v-select>
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
import TypeDataService from "../../services/TypeDataService";

export default {
  name: "add-contribution",
  data() {
    return {
      contribution: {
        member_id: "",
        c_type_id: "",
        amount: "",
      },
      members: [],
      // input: {
      //   user_id: "",
      // },
      users: [],
      member: {
        id: "",
      },
      types: [],
      type: {
        _id: "",
      },
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
      console.log(this.contribution.member_id);
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
            let values = {
              fname: element.lname,
              id: element._id,
            };
            this.members.push(values);
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    retrieveTypes() {
      TypeDataService.getAll()
        .then((response) => {
          const returns = response.data;
          returns.forEach((element) => {
            let values = {
              _id: element._id,
              title: element.title,
            };
            this.types.push(values);
          });
          console.log(this.types);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },

  mounted() {
    this.retrieveMembers();
    this.retrieveTypes();
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
}
</style>