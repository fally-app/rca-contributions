<template>
  <div class="submit-form mt-3 mx-auto">
    <p class="headline">Add New Type</p>

    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="type.title"
          :rules="[(v) => !!v || 'Title is required']"
          label="Title"
          required
        ></v-text-field>

        <v-text-field
          v-model="type.description"
          :rules="[(v) => !!v || 'Description is required']"
          label="Description"
          required
        ></v-text-field>
      </v-form>

      <v-btn color="primary" class="mt-3" @click="saveType">Submit</v-btn>
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-card-title> Submitted successfully! </v-card-title>

        <v-card-subtitle> Click the button to add new member. </v-card-subtitle>

        <v-card-actions>
          <v-btn color="success" @click="newType">Add</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import TypeDataService from "../../services/TypeDataService";

export default {
  name: "add-member",
  data() {
    return {
      type: {
        id: "",
        title: "",
        description: "",
      },
      submitted: false,
    };
  },
  methods: {
    saveType() {
      var data = {
        title: this.type.title,
        simple_description: this.type.description,
      };

      TypeDataService.create(data)
        .then((response) => {
          this.type.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newMember() {
      this.submitted = false;
      this.type = {};
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
}
</style>