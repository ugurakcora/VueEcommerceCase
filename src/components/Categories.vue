<template>
  <div class="filter">
    <button @click="resetFilter">Tüm Kategorileri Göster</button>
    <span v-for="category in categories" :key="category.id">
      <button @click="filterProductsByCategory(category)" :class="{ active: selectedCategory === category }">
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
        this.categories = response.data.map(category => this.formatCategoryName(category));
      })
      .catch((error) => {
        console.error('Kategorileri alırken hata oluştu:', error);
      });
  },
  methods: {
    formatCategoryName(category) {
      // "-" işaretini kaldır ve kelimelerin ilk harfini büyük harfle yaz
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

<style>
.active {
  background-color: #3490dc;
  color: #fff;
}
</style>
