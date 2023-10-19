<template>
  <div>
    <Basket></Basket>
    <h1>Ürün Detayı</h1>
    <div class="product-detail">
      <div class="product-detail-info" v-if="product">
        <h2>{{ product.title }}</h2>
        <h3>{{ product.description }}</h3>
        <p>Fiyat: {{ product.price }} TL</p>
        <p>Stok: {{ product.stock }}</p>
        <button @click="addToCart" :disabled="product.stock === 0">Sepete Ekle</button>
      </div>
      <div class="product-detail-image" v-if="product">
        <img :src="product.thumbnail" :alt="product.title" />
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
      product: null,
    };
  },
  created() {
    const productId = this.$route.params.id;
    axios.get(`https://dummyjson.com/products/${productId}`)
      .then((response) => {
        this.product = response.data;
      })
      .catch((error) => {
        console.error('Ürün detayını alırken hata oluştu:', error);
      });
  },
  methods: {
    addToCart() {
      if (this.product && this.product.stock > 0) {
        this.$root.$emit('addToCart', this.product);
        this.product.stock -= 1;
      }
    },
  },
};
</script>
