<template>
  <div>
    <Basket></Basket>
    <h1>Ürün Listesi</h1>
    <div class="product">
      <div class="product_item" v-for="product in products" :key="product.id">
        <a class="product_item-wrapper" :href="`/product/${product.id}`">{{ product.title }}
          <img class="product_item-img" :src="product.images[0]" :alt="product.title" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Basket from './Basket.vue';

export default {
  components: {
    Basket,
  },
  data() {
    return {
      products: [],
    };
  },
  created() {
    axios.get('https://dummyjson.com/products') // Ürün verilerini almak için API isteği
      .then((response) => {
        this.products = response.data.products; // API yanıtından gelen verileri kullanın
        console.log(response.data.products)
      })
      .catch((error) => {
        console.error('Ürün verilerini alırken hata oluştu:', error);
      });
  },
};
</script>

<style src="../style/ProductList.css" />
