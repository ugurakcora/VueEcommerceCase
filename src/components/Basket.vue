<template>
  <div>
    <h2>Sepet</h2>
    <ul>
      <li v-for="(item, index) in cart" :key="index">
        {{ item.title }} - {{ item.quantity }} adet - Fiyat: {{ item.price * item.quantity }} TL
        <button @click="incrementQuantity(index)">Arttır</button>
        <button @click="decrementQuantity(index)">Azalt</button>
      </li>
    </ul>

    <div>
      <strong>Toplam Tutar: {{ totalAmount }} TL</strong>
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
      }
      this.saveCartToLocalStorage();
    },
    saveCartToLocalStorage() {
      // Sepet içeriğini local storage'a kaydedin
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },
  },
};
</script>
