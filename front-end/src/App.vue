<template>
  <v-app>
    <!-- <v-app-bar app white> -->
    <!-- <div class="d-flex align-center mr-2">
        Didien Cheetah
      </div>

      <v-btn to="/members" text>
        Members
      </v-btn>

      <v-btn to="add" text>
        Add
      </v-btn> -->
    <div id="wrapper">
      <nav id="sidebar">
        <div class="sidebar-header">
          <h3>RCA-NTEVT SDA</h3>
        </div>

        <ul class="list-unstyled components">
          <p>Contributions manager</p>
          <li>
            <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false"
              >Home</a
            >
            <ul class="collapse list-unstyled" id="homeSubmenu">
              <router-link to="/members"><li>Members List</li></router-link>
              <router-link to="/add"><li>Add Member</li></router-link>
              <li><a>Edit Member</a></li>
            </ul>
          </li>
          <li>
            <a href="#">Contributions</a>
            <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false"
              >Types</a
            >
            <ul class="collapse list-unstyled" id="pageSubmenu">
              <router-link to="/types"><li>Types List</li></router-link>
              <li><a href="#">Add Type</a></li>
              <li><a href="#">Edit Type</a></li>
            </ul>
          </li>
          <li>
            <a href="#">Contributions</a>
            <a href="#contSubmenu" data-toggle="collapse" aria-expanded="false"
              >Contributions</a
            >
            <ul class="collapse list-unstyled" id="contSubmenu">
              <router-link to="/contributions"
                ><li>Contributions List</li></router-link
              >
              <router-link to="/addcontribution"
                ><li>Add Contribution</li></router-link
              >
              <li><a href="#">Edit Contribution</a></li>
            </ul>
          </li>
          <li>
            <a href="#">Contributions</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>

        <ul class="list-unstyled CTAs">
          <li><a href="" class="download">Go Home</a></li>
          <li><a href="" class="article">Register Member</a></li>
        </ul>
      </nav>
      <!-- </v-app-bar> -->
      <div id="content">
        <v-main>
          <nav class="navbar navbar-default">
            <div class="container-fluid">
              <div class="navbar-header">
                <button
                  type="button"
                  id="sidebarCollapse"
                  class="btn btn-info navbar-btn"
                >
                  <i class="glyphicon glyphicon-align-left"></i>
                  <span>Toggle Sidebar</span>
                </button>
              </div>

              <div
                class="collapse navbar-collapse"
                id="bs-example-navbar-collapse-1"
              >
                <ul class="nav navbar-nav navbar-right">
                  <li><a href="#">Members</a></li>
                  <li><a href="#">Types</a></li>
                  <li><a href="#">Contributions</a></li>
                </ul>
              </div>
            </div>
          </nav>
          <router-view />
        </v-main>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "app",
};
</script>
