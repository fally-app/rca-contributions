import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/members",
      name: "members",
      component: () => import("./components/MembersList"),
    },
    {
      path: "/members/:id",
      name: "members-details",
      component: () => import("./components/Member"),
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddMember"),
    },
  ],
});
