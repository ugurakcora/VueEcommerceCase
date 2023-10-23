<template>
  <div>
    <button @click="resetFilter" class="reset-button">Tüm Kategorileri Göster</button>
    <span v-for="category in categories" :key="category.id">
      <button @click="filterProductsByCategory(category)" :class="{ active: selectedCategory === category }"
        class="category-button">
        {{ formatCategoryName(category) }}
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
    formatCategoryName(category) {
      return category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    },
    filterProductsByCategory(category) {
      this.selectedCategory = category;
      this.$emit('filter-by-category', category);
    },
    resetFilter() {
      this.selectedCategory = null;
      this.$emit('filter-by-category', null);
    }
  }
};
</script>

<style src="../style/Categories.css" />
