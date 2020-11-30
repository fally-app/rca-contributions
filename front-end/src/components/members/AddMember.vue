<template>
  <div class="submit-form mt-3 mx-auto">
    <p class="headline">Add member</p>

    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="member.fname"
          :rules="[(v) => !!v || 'First name is required']"
          label="First name"
          required
        ></v-text-field>

        <v-text-field
          v-model="member.lname"
          :rules="[(v) => !!v || 'Last name is required']"
          label="Last name"
          required
        ></v-text-field>

         <v-select
        v-model="member.gender"
        :items="selects"
        label="Gender"
      ></v-select>
      </v-form>

      <v-btn color="primary" class="mt-3" @click="saveMember">Submit</v-btn>
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
          <v-btn color="success" @click="newMember">Add</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import MemberDataService from "../../services/MemberDataService";

export default {
  name: "add-member",
  data() {
    return {
      member: {
        id: "",
        fname: "",
        lname: "",
        gender: "",
      },
      submitted: false,
      selects: ['Male','Female']
    };
  },
  methods: {
    saveMember() {
      var data = {
        fname: this.member.fname,
        lname: this.member.lname,
        gender: this.member.gender,
      };

      MemberDataService.create(data)
        .then((response) => {
          this.member.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newMember() {
      this.submitted = false;
      this.member = {};
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
}
</style>