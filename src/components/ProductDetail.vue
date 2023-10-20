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
        <div class="product-quantity" v-if="product.stock > 0">
          <button @click="decrementQuantity">-</button>
          <span>{{ product.quantity }}</span>
          <button @click="incrementQuantity">+</button>
        </div>
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
        this.product.quantity = 1; // Adet sayısını başlangıçta 1 olarak ayarla
      })
      .catch((error) => {
        console.error('Ürün detayını alırken hata oluştu:', error);
      });
  },
  methods: {
    addToCart() {
      if (this.product && this.product.stock > 0 && this.product.quantity > 0) {
        for (let i = 0; i < this.product.quantity; i++) {
          this.$root.$emit('addToCart', this.product);
          this.product.stock -= 1;
        }
        this.product.quantity = 1; // Eklenen ürün sayısını sıfırla
      }
    },
    decrementQuantity() {
      if (this.product.quantity > 1) {
        this.product.quantity--;
      }
    },
    incrementQuantity() {
      if (this.product.quantity < this.product.stock) {
        this.product.quantity++;
      }
    },
  },
};
</script>
