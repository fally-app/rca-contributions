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

      <v-text-field
        v-model="currentMember.gender"
        :rules="[(v) => !!v || 'Gender is required']"
        label="Gender"
        required
      ></v-text-field>

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
  name: "tutorial",
  data() {
    return {
      currentTutorial: null,
      message: "",
    };
  },
  methods: {
    getTutorial(id) {
      MemberDataService.get(id)
        .then((response) => {
          this.currentTutorial = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentTutorial.id,
        title: this.currentTutorial.title,
        description: this.currentTutorial.description,
        published: status,
      };

      MemberDataService.update(this.currentTutorial.id, data)
        .then((response) => {
          this.currentTutorial.published = status;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateTutorial() {
      MemberDataService.update(this.currentTutorial.id, this.currentTutorial)
        .then((response) => {
          console.log(response.data);
          this.message = "The tutorial was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteTutorial() {
      MemberDataService.delete(this.currentTutorial.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "tutorials" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getTutorial(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
