<template>
  <div class="cart-container">
    <h2 class="cart-title">Sepet</h2>
    <ul class="cart-list">
      <li class="not-found" v-if="cart.length === 0">Sepetiniz boş.</li>
      <li v-else v-for="(item, index) in cart" :key="index" class="cart-item">
        <div class="cart-item-details">
          <img :src="item.thumbnail" :alt="item.title" class="item-image" />
          <div class="item-description">
            <span class="item-title">{{ item.title }}</span>
            <span class="item-quantity"> {{ item.quantity }} adet</span>
          </div>
        </div>
        <div class="cart-item-actions">
          <span class="item-price">{{ $formatPrice( item.price * item.quantity )}}</span>
          <button @click="incrementQuantity(index)" class="action-button">Arttır</button>
          <button @click="decrementQuantity(index)" class="action-button">Azalt</button>
          <button @click="removeFromCart(index)" class="action-button remove-button">Kaldır</button>
        </div>
      </li>
    </ul>

    <div class="total-amount" v-if="cart.length > 0">
      <strong>Toplam Tutar: {{ $formatPrice( totalAmount )}}</strong>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: [], // Sepetteki ürünleri saklamak için dizi
    };
  },
  computed: {
    totalAmount() {
      let total = 0;
      for (const item of this.cart) {
        total += item.price * item.quantity;
      }
      return total;
    },
  },
  created() {
    // Local storage'dan sepet içeriğini alın
    const cartItems = JSON.parse(localStorage.getItem('cart'));
    if (cartItems) {
      this.cart = cartItems;
    }
  },
  methods: {
    incrementQuantity(index) {
      this.cart[index].quantity++;
      this.saveCartToLocalStorage();
    },
    decrementQuantity(index) {
      if (this.cart[index].quantity > 1) {
        this.cart[index].quantity--;
      } else {
        // Eğer ürünün miktarı 1'den azsa, ürünü sepetten kaldır
        this.cart.splice(index, 1);
      }
      this.saveCartToLocalStorage();
    },
    removeFromCart(index) {
      // Sepetten ürünü kaldır
      this.cart.splice(index, 1);
      this.saveCartToLocalStorage();
    },
    saveCartToLocalStorage() {
      // Sepet içeriğini local storage'a kaydedin
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },
  },
};
</script>

<style src="../style/Basket.css" />

