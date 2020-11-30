<template>
  <div v-if="currentMember" class="edit-form py-3">
    <p class="headline">Edit Contribution</p>

    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="currentContribution.member_id"
        :rules="[(v) => !!v || 'Member Id is required']"
        label="Member Id"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentContribution.c_type_id"
        :rules="[(v) => !!v || 'Type is required']"
        label="Type"
        required
      ></v-text-field>
      <v-text-field
        v-model="currentContribution.amount"
        :rules="[(v) => !!v || 'Amount is required']"
        label="Amount"
        required
      ></v-text-field>

      <!-- <v-text-field
        v-model="currentContribution.createdAt"
        :rules="[(v) => !!v || 'Data is required']"
        label="Date"
        required
      ></v-text-field> -->
      <label for="meeting-time">Choose a time for your appointment:</label>

      <input
        type="datetime-local"
        id="meeting-time"
        name="meeting-time"
        value="2018-06-12T19:30"
        min="2018-06-07T00:00"
        max="2018-06-14T00:00"
      />

      <!-- <v-select
        v-model="currentContribution.createrAt"
        :items="selects"
        label="Date"
      ></v-select> -->

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

export default {
  name: "contribution",
  data() {
    return {
      currentContribution: null,
      message: "",
    };
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
        amaount: this.currentContribution.amount,
      })
        .then((response) => {
          console.log(response.data);
          this.message = "The Contribution was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteContibution() {
      ContibutionDataService.delete(this.currentContibution._id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "contibutions" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getContibution(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
