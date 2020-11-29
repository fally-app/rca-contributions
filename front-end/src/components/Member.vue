<template>
  <div v-if="currentMember" class="edit-form py-3">
    <p class="headline">Edit Member</p>

    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="currentMember.fname"
        :rules="[(v) => !!v || 'First name is required']"
        label="First name"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentMember.lname"
        :rules="[(v) => !!v || 'Last name is required']"
        label="Last name"
        required
      ></v-text-field>

      <!-- <v-text-field
        v-model="currentMember.gender"
        :rules="[(v) => !!v || 'Gender is required']"
        label="Gender"
        required
      ></v-text-field> -->
      <v-select
        v-model="currentMember.gender"
        :items="selects"
        label="Gender"
      ></v-select>

      <!-- <label><strong>Status:</strong></label>
      {{ currentTutorial.published ? "Published" : "Pending" }} -->

      <v-divider class="my-5"></v-divider>
<!-- 
      <v-btn
        v-if="currentTutorial.published"
        @click="updatePublished(false)"
        color="primary"
        small
        class="mr-2"
      >
        UnPublish
      </v-btn>

      <v-btn
        v-else
        @click="updatePublished(true)"
        color="primary"
        small
        class="mr-2"
      >
        Publish
      </v-btn> -->

      <v-btn color="error" small class="mr-2" @click="deleteMember">
        Delete
      </v-btn>

      <v-btn color="success" small @click="updateMember">
        Update
      </v-btn>
    </v-form>

    <p class="mt-3">{{ message }}</p>
  </div>

  <div v-else>
    <p>Please click on a Member...</p>
  </div>
</template>

<script>
import MemberDataService from "../services/MemberDataService";

export default {
  name: "member",
  data() {
    return {
      currentMember: null,
      message: "",
      selects: ['Male','Female']
    };
  },
  methods: {
    getMember(id) {
      MemberDataService.get(id)
        .then((response) => {
          this.currentMember = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // updatePublished(status) {
    //   var data = {
    //     id: this.currentMember.id,
    //     title: this.currentMember.title,
    //     description: this.currentMember.description,
    //     published: status,
    //   };

    //   MemberDataService.update(this.currentTutorial.id, data)
    //     .then((response) => {
    //       this.currentTutorial.published = status;
    //       console.log(response.data);
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // },

    updateMember() {
      MemberDataService.update(this.currentMember._id, {"fname":this.currentMember.fname,"lname":this.currentMember.lname,"gender":this.currentMember.gender})
        .then((response) => {
          console.log(response.data);
          this.message = "The Member was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteMember() {
      MemberDataService.delete(this.currentMember._id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "members" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getMember(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
