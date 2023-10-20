import { createRouter, createWebHistory } from "vue-router";
import ProductList from "@/components/ProductList.vue";
import ProductDetail from "@/components/ProductDetail.vue";
import Basket from "@/components/Basket.vue";

const routes = [
  { path: "/", component: ProductList }, // Ana sayfa için
  { path: "/product/:id", component: ProductDetail }, // Ürün detay sayfası için
  { path: "/basket", component: Basket }, // Sepet sayfası için
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
