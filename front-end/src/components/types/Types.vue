<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>
          Types
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="types" :search="search">
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editType(item.id)"
              >mdi-pencil</v-icon
            >
            <v-icon small @click="deleteType(item.id)">mdi-delete</v-icon>
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

        <v-card-actions v-if="types.length > 0">
          <v-btn small color="error" @click="removeAllTypes">
            Remove All
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import TypeDataService from "../../services/TypeDataService";
export default {
  name: "types_list",
  data() {
    return {
      types: [],
      title: "",
      search: "",
      headers: [
        { text: "Title", align: "start", sortable: true, value: "title" },
        { text: "Description", value: "simple_description", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    retrieveTypes() {
      TypeDataService.getAll()
        .then((response) => {
          this.types = response.data.map(this.getDisplayType);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveTypes();
    },

    removeAllTypes() {
      TypeDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchName() {
      TypeDataService.findByName(this.title)
        .then((response) => {
          this.types = response.data.map(this.getDisplayType);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    editType(id) {
      this.$router.push({ name: "type_details", params: { id: id } });
    },

    deleteType(id) {
      TypeDataService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getDisplayType(type) {
      return {
        id: type._id,
        title:
          type.title.length > 30
            ? type.title.substr(0, 30) + "..."
            : type.title,
        simple_description:
          type.simple_description.length > 30
            ? type.simple_description.substr(0, 30) + "..."
            : type.simple_description,
      };
    },
  },
  mounted() {
    this.retrieveTypes();
  },
};
</script>

<style>
.list {
  max-width: 750px;
}
</style>
