<template>
  <div class="header">
    <div class="header-left" @click="goToHome">
      <span class="logo">vuEcommerceCase</span>
    </div>
    <div class="header-right">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" @click="goToCartPage"
        style="cursor: pointer">
        <path fill="#000000"
          d="M19.68 14.99l-2.21-7.77c-.30-1.06-1.18-1.76-2.25-1.76h-9.10c-1.07 0-1.94.70-2.24 1.76l-2.22 7.77c-.36 1.24.36 2.54 1.38 2.83h12.94c1.03-.29 1.74-1.59 1.38-2.83zm-11.68-5.99c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm9 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z" />
      </svg>
      <span class="cart-item-count" v-if="cartItemCount > 0">{{ cartItemCount }}</span>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    cartItemCount() {
      // Vuex Store'dan sepetteki ürün sayısını alın
      return this.$store.getters.cartItemCount;
    },
  },
  methods: {
    goToHome() {
      // Anasayfaya yönlendirme işlemi
      this.$router.push('/');
    },
    goToCartPage() {
      // Sepet sayfasına yönlendirme işlemi
      this.$router.push('/basket');
    },
  },
};
</script>

<style src="../style/Header.css" />

