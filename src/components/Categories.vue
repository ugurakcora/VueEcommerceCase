<template>
  <div>
    <button @click="resetFilter">Tüm Kategorileri Göster</button>
    <span v-for="category in categories" :key="category.id">
      <button @click="filterProductsByCategory(category)" :class="{ active: selectedCategory === category }">
        {{ category }}
      </button>
    </span>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      categories: [],
      selectedCategory: null
    };
  },
  created() {
    axios.get('https://dummyjson.com/products/categories')
      .then((response) => {
        this.categories = response.data;
      })
      .catch((error) => {
        console.error('Kategorileri alırken hata oluştu:', error);
      });
  },
  methods: {
    filterProductsByCategory(category) {
      this.selectedCategory = category;
      this.$emit('filter-by-category', category);
    },
    resetFilter() {
      this.selectedCategory = null;
      this.$emit('filter-by-category', null); // Tüm kategoriyi göster
    }
  }
};
</script>

<style>
.active {
  background-color: #3490dc;
  color: #fff;
}
</style>
