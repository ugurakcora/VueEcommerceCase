<template>
  <div>
    <Categories :categories="categories" @filter-by-category="filterProductsByCategory" />
    <h1>Ürün Listesi</h1>
    <div class="product">
      <div v-if="filteredProducts.length > 0" class="product_item" v-for="product in filteredProducts" :key="product.id">
        <a class="product_item-wrapper" :href="`/product/${product.id}`">{{ product.title }}
          <img class="product_item-img" :src="product.images[0]" :alt="product.title" />
        </a>
      </div>
      <div v-else>
        <p>Seçilen kategoriye ait ürün bulunmamaktadır.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Categories from './Categories.vue';

export default {
  components: {
    Categories,
  },
  data() {
    return {
      products: [],
      categories: [],
      selectedCategory: null,
    };
  },
  computed: {
    filteredProducts() {
      if (!this.selectedCategory) {
        return this.products;
      }
      return this.products.filter(product => product.category === this.selectedCategory);
    },
  },
  methods: {
    filterProductsByCategory(category) {
      this.selectedCategory = category;
    },
  },
  created() {
    axios.get('https://dummyjson.com/products')
      .then((response) => {
        this.products = response.data.products;
      })
      .catch((error) => {
        console.error('Ürün verilerini alırken hata oluştu:', error);
      });
  },
};
</script>

<style src="../style/ProductList.css" />
