<template>
  <div v-if="currentType" class="edit-form py-3">
    <p class="headline">Edit Type</p>

    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="currentType.title"
        :rules="[(v) => !!v || 'Title is required']"
        label="Title"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentType.simple_description"
        :rules="[(v) => !!v || 'Description is required']"
        label="Description"
        required
      ></v-text-field>

      <!-- <v-text-field
        v-model="currentType.gender"
        :rules="[(v) => !!v || 'Gender is required']"
        label="Gender"
        required
      ></v-text-field> -->

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

      <v-btn color="error" small class="mr-2" @click="deleteType">
        Delete
      </v-btn>

      <v-btn color="success" small @click="updateType"> Update </v-btn>
    </v-form>

    <p class="mt-3">{{ message }}</p>
  </div>

  <div v-else>
    <p>Please click on a Member...</p>
  </div>
</template>

<script>
import TypeDataService from "../../services/TypeDataService";

export default {
  name: "type",
  data() {
    return {
      currentType: null,
      message: "",
    };
  },
  methods: {
    getType(id) {
      TypeDataService.get(id)
        .then((response) => {
          this.currentType = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // updatePublished(status) {
    //   var data = {
    //     id: this.currentType.id,
    //     title: this.currentType.title,
    //     description: this.currentType.description,
    //     published: status,
    //   };

    //   TypeDataService.update(this.currentTutorial.id, data)
    //     .then((response) => {
    //       this.currentTutorial.published = status;
    //       console.log(response.data);
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // },

    updateType() {
      TypeDataService.update(this.currentType._id, {
        title: this.currentType.title,
        simple_description: this.currentType.simple_description,
      })
        .then((response) => {
          console.log(response.data);
          this.message = "The Type was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteType() {
      TypeDataService.delete(this.currentType._id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "types" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getType(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
