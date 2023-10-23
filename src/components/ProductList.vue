<template>
  <div class="container">
    <Categories :categories="categories" @filter-by-category="filterProductsByCategory" />
    <h1>Ürün Listesi</h1>
    <input v-model="searchQuery" @input="searchProducts" placeholder="Ürün Ara" />
    <div class="product">
      <div v-if="filteredProducts.length > 0" class="product_item" v-for="product in filteredProducts" :key="product.id">
        <a class="product_item-wrapper" :href="`/product/${product.id}`">
          <img class="product_item-img" :src="product.images[0]" :alt="product.title" />
          <p class="product_item-title">{{ product.title }}</p>
          <div class="product_item-details">
            <div class="product_item-prices">
              <div class="product_item-price">
                <del>
                  {{ $formatPrice(product.price / (1 - (product.discountPercentage / 100))) }}
                </del>
              </div>
              <div class="product_item-price">
                {{ $formatPrice(product.price) }}
              </div>
            </div>
            <div class="product_item-discount">
              <span class="product_item-discount-percentage">
                {{ product.discountPercentage + '% İndirim' }}
              </span>
            </div>
          </div>
        </a>
      </div>
      <div class="not-found" v-else>
        <p>Seçilen kategoriye veya arama sorgusuna ait ürün bulunmamaktadır.</p>
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
      searchQuery: '', // Arama sorgusu
    };
  },
  computed: {
    filteredProducts() {
      let filtered = this.products;

      if (this.selectedCategory) {
        filtered = filtered.filter(product => product.category === this.selectedCategory);
      }

      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(product => product.title.toLowerCase().includes(query));
      }

      return filtered;
    },
  },
  methods: {
    filterProductsByCategory(category) {
      this.selectedCategory = category;
    },
    searchProducts() {
      // Arama sorgusuna göre ürünleri filtrele
      // Filtreleme işlemi yukarıda computed özelliğinde yapılıyor.
    },
  },
  created() {
    axios.get('https://dummyjson.com/products')
      .then((response) => {
        this.products = response.data.products;
        console.log(response.data.products);
      })
      .catch((error) => {
        console.error('Ürün verilerini alırken hata oluştu:', error);
      });
  },
};
</script>


<style src="../style/ProductList.css" />
