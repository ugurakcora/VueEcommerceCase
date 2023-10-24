<template>
  <div class="product-detail-container">
    <div class="product-detail">
      <div class="product-detail-info" v-if="product">
        <carousel :items-to-show="1">
          <slide v-for="(image, index) in product.images" :key="index">
            <img :src="image" :alt="product.title" class="product-image" />
          </slide>
          <template #addons>
            <navigation />
            <pagination />
          </template>
        </carousel>
        <h2 class="product-title">{{ product.title }}</h2>
        <p class="product-description">{{ product.description }}</p>
        <div class="product-price-stock">
          <p class="product-price">
            Fiyat:
            <span class="original-price" v-if="product.discountPercentage > 0">
              <del>
                {{ $formatPrice(product.price / (1 - (product.discountPercentage / 100))) }}
              </del>
            </span>
            {{ $formatPrice(product.price) }}
          </p>
          <p class="product-discount" v-if="product.discountPercentage > 0">
            İndirim: {{ product.discountPercentage + '%' }}
          </p>
          <p class="product-stock">Stok: {{ product.stock }}</p>
        </div>
        <div class="product-rating">
          <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= Math.round(product.rating) }">
            &#9733;
          </span>
        </div>
        <div class="product-quantity" v-if="product.stock > 0">
          <button @click="decrementQuantity">-</button>
          <span class="quantity">{{ product.quantity }}</span>
          <button @click="incrementQuantity">+</button>
        </div>
        <button @click="addToCart" :disabled="product.stock === 0" class="add-to-cart-button">
          Sepete Ekle
        </button>
      </div>
    </div>
  </div>
  <div class="notification" v-if="notification">{{ notification }}</div>
</template>

<script>
import axios from 'axios';
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

export default {
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  data() {
    return {
      product: null,
      notification: null, // Bildirim mesajı
    };
  },
  created() {
    const productId = this.$route.params.id;
    axios
      .get(`https://dummyjson.com/products/${productId}`)
      .then((response) => {
        this.product = response.data;
        this.product.quantity = 1; // Adet sayısını başlangıçta 1 olarak ayarla
      })
      .catch((error) => {
        console.error('Ürün detayını alırken hata oluştu:', error);
      });

    // Eğer ürün daha önce sepete eklenmişse, bu ürünün miktarını güncelle
    const existingCartItem = this.$store.state.cart.find((item) => item.id === productId);
    if (existingCartItem) {
      this.product.quantity = existingCartItem.quantity;
    }
  },
  methods: {
    addToCart() {
      if (this.product && this.product.stock > 0 && this.product.quantity > 0) {
        // Local storage'dan sepet içeriğini alın
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Ürünün sepette olup olmadığını kontrol edin
        const existingItemIndex = cart.findIndex((item) => item.id === this.product.id);

        if (existingItemIndex !== -1) {
          // Eğer ürün zaten sepetteyse, miktarını artırın
          cart[existingItemIndex].quantity += this.product.quantity;
        } else {
          // Eğer ürün daha önce eklenmemişse, yeni bir öğe olarak ekleyin
          const newItem = { ...this.product };
          cart.push(newItem);
        }

        // Sepet içeriğini local storage'a kaydedin
        localStorage.setItem('cart', JSON.stringify(cart));

        // Ürün stok miktarını düşürün
        this.product.stock -= this.product.quantity;
        this.product.quantity = 1;

        // Bildirimi göster
        this.notification = 'Sepete Eklendi';
        setTimeout(() => {
          this.notification = null;
        }, 3000);
      } else {
        // Ürün eklenemedi bildirimi
        this.notification = 'Sepete Ürün Eklenemedi';
        setTimeout(() => {
          this.notification = null;
        }, 3000);
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

<style src="../style/ProductDetail.css" />
