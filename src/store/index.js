import { createStore } from "vuex";

export default createStore({
  state: {
    cart: [], // Sepetteki ürünleri saklamak için dizi
  },
  mutations: {
    addToCart(state, product) {
      const existingItem = state.cart.find((item) => item.id === product.id);

      if (existingItem) {
        // Eğer ürün zaten sepete ekliyse, sadece miktarını artırın
        existingItem.quantity += product.quantity;
      } else {
        // Eğer ürün daha önce eklenmemişse, yeni bir öğe olarak ekleyin
        const newItem = { ...product };
        state.cart.push(newItem);
      }

      // Sepet içeriğini local storage'a kaydet
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    incrementCartItem(state, item) {
      const foundItem = state.cart.find((cartItem) => cartItem.id === item.id);
      if (foundItem) {
        foundItem.quantity++;
      }
    },
    decrementCartItem(state, item) {
      const foundItem = state.cart.find((cartItem) => cartItem.id === item.id);
      if (foundItem && foundItem.quantity > 1) {
        foundItem.quantity--;
      }
    },
  },
});
