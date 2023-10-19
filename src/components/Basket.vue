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
  </div>
</template>


<script>
export default {
  data() {
    return {
      cart: [], // Sepetteki ürünleri saklamak için dizi
    };
  },
  methods: {
    addToCart() {
      if (this.product.stock > 0) {
        const newItem = {
          title: this.product.title,
          quantity: 1, // Başlangıçta bir adet eklenir
          price: this.product.price, // Ürünün fiyatını kaydet
        };

        // Sepete yeni öğeyi ekleyin
        this.cart.push(newItem);

        this.product.stock -= 1; // Stok miktarını azalt
      }
    },

    incrementQuantity(index) {
      this.cart[index].quantity++;
    },

    decrementQuantity(index) {
      if (this.cart[index].quantity > 0) {
        this.cart[index].quantity--;
      }
    },
  },


};
</script>
