import { createRouter, createWebHistory } from "vue-router";
import InventoryView from "../views/View.vue";
import ItemCreate from "../views/Create.vue";
import InventoryEdit from "../views/Edit.vue";
import InventoryOne from "../views/Viewone.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "",
      redirect: { name: "inventory" },
    },
    {
      path: "/inventory",
      name: "inventory",
      component: InventoryView,
    },
    {
      path: "/add-inventory",
      name: "ItemCreate",
      component: ItemCreate,
    },
    {
      path: "/inventory/:id/edit",
      name: "InventoryEdit",
      component: InventoryEdit,
    },
    {
      path: "/inventory/:id",
      name: "InventoryOne",
      component: InventoryOne,
    },
  ],
});

export default router;
