<template>
  <div v-if="currentContribution" class="edit-form py-3">
    <p class="headline">Edit Contribution</p>

    <v-form ref="form" lazy-validation>
      <!-- <v-text-field
        v-model="currentContribution.member.lname"
        :rules="[(v) => !!v || 'Member Id is required']"
        label="Member Id"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentContribution.types.title"
        :rules="[(v) => !!v || 'Type is required']"
        label="Type"
        required
      ></v-text-field> -->
      <v-text-field
        v-model="currentContribution.amount"
        :rules="[(v) => !!v || 'Amount is required']"
        label="Amount"
        required
      ></v-text-field>
      <v-select
        v-model="currentContribution.member_id"
        :items="members"
        item-value="id"
        item-text="fname"
        label="Member"
      ></v-select>

      <v-select
        v-model="currentContribution.c_type_id"
        :items="types"
        item-value="_id"
        item-text="title"
        label="Type"
      ></v-select>
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

      <!-- <label for="meeting-time">Date</label> -->

      <!-- <input
        type="datetime-local"
        id="meeting-time"
        name="meeting-time"
        value="2018-06-12T19:30"
        min="2018-06-07T00:00"
        max="2018-06-14T00:00"
      /> -->

      <!-- <v-divider class="my-5"></v-divider> -->

      <v-btn color="error" small class="mr-2" @click="deleteContribution">
        Delete
      </v-btn>

      <v-btn color="success" small @click="updateContribution"> Update </v-btn>
    </v-form>

    <p class="mt-3">{{ message }}</p>
  </div>

  <div v-else>
    <p>Please click on a Member...</p>
  </div>
</template>

<script>
import ContributionDataService from "../../services/ContributionDataService";
import MemberDataService from "../../services/MemberDataService";
import TypeDataService from "../../services/TypeDataService";

export default {
  name: "contribution",
  data() {
    return {
      currentContribution: null,
      message: "",
      fromDateMenu: false,
      fromDateVal: null,
      minDate: "2020-01-05",
      maxDate: "2019-08-30",
      members: [],
      types: [],
      type: {
        _id: "",
      },
      member: {
        id: "",
      },
    };
  },
  computed: {
    fromDateDisp() {
      return this.fromDateVal;
      // format/do something with date
    },
  },
  methods: {
    getContribution(id) {
      ContributionDataService.get(id)
        .then((response) => {
          this.currentContribution = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateContribution() {
      ContributionDataService.update(this.currentContribution._id, {
        member_id: this.currentContribution.member_id,
        c_type_id: this.currentContribution.c_type_id,
        amount: this.currentContribution.amount,
      })
        .then((response) => {
          console.log(response.data);
          this.message = "The Contribution was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteContribution() {
      ContributionDataService.delete(this.currentContribution._id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "Contributions" });
        })
        .catch((e) => {
          console.log(e);
        });
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
    this.message = "";
    this.getContribution(this.$route.params.id);
    this.retrieveTypes();
    this.retrieveMembers();
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
