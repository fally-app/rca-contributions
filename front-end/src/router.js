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
      component: () => import("./components/members/MembersList"),
    },
    {
      path: "/members/:id",
      name: "member-details",
      component: () => import("./components/members/Member"),
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/members/AddMember"),
    },
    {
      path: "/contributions",
      name: "contributions",
      component: () => import("./components/contributions/Contributions"),
    },
    {
      path: "/addcontribution",
      name: "addcontribution",
      component: () => import("./components/contributions/AddContribution"),
    },
    {
      path: "/types",
      name: "types",
      component: () => import("./components/types/Types"),
    },
    {
      path: "/addtype",
      name: "addtype",
      component: () => import("./components/types/AddType"),
    },
  ],
});
