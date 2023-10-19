import { createRouter, createWebHistory } from "vue-router";
import ProductList from "@/components/ProductList.vue";
import ProductDetail from "@/components/ProductDetail.vue";

const routes = [
  { path: "/", component: ProductList }, // Ana sayfa için
  { path: "/product/:id", component: ProductDetail }, // Ürün detay sayfası için
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
