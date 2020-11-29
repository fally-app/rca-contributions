<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" md="8">
      <v-text-field v-model="fname" label="Search by Name"></v-text-field>
    </v-col>

    <v-col cols="12" md="4">
      <v-btn small @click="searchName">
        Search
      </v-btn>
    </v-col>

    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Members</v-card-title>
<v-data-table
      :headers="headers"
      :items="members"
      :items-per-page="5"
      class="elevation-1"
    >
    <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editMember(item.id)"
              >mdi-pencil</v-icon
            >
            <v-icon small @click="deleteMember(item.id)">mdi-delete</v-icon>
    </template>
    </v-data-table>
        <!-- <v-data-table
          :headers="headers"
          :items="members"
          disable-pagination
          :hide-default-footer="false"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editMember(item.id)"
              >mdi-pencil</v-icon
            >
            <v-icon small @click="deleteMember(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table> -->

        <v-card-actions v-if="members.length > 0">
          <v-btn small color="error" @click="removeAllMembers">
            Remove All
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import MemberDataService from "../services/MemberDataService";
export default {
  name: "members-list",
  data() {
    return {
      members: [],
      fname: "",
      calories: "",
      headers: [
        { text: "Fname", align: "start", sortable: true, value: "fname" },
        { text: "Lname", value: "lname", sortable: true },
        { text: "Gender", value: "gender", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    retrieveMembers() {
      MemberDataService.getAll()
        .then((response) => {
          this.members = response.data.map(this.getDisplayMember);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveMembers();
    },

    removeAllMembers() {
      MemberDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchName() {
      MemberDataService.findByName(this.fname)
        .then((response) => {
          this.members = response.data.map(this.getDisplayMember);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    editMember(id) {
      this.$router.push({ name: "member-details", params: { id: id } });
    },

    deleteMember(id) {
      MemberDataService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getDisplayMember(member) {
      return {
        id: member._id,
        fname:
          member.fname.length > 30
            ? member.fname.substr(0, 30) + "..."
            : member.fname,
        lname:
          member.lname.length > 30
            ? member.lname.substr(0, 30) + "..."
            : member.lname,
        
        gender:
          member.gender.length > 30
            ? member.gender.substr(0, 30) + "..."
            : member.gender,
        
      
      };
    },
  },
  mounted() {
    this.retrieveMembers();
  },
};
</script>

<style>
.list {
  max-width: 750px;
}
</style>
