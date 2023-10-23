<template>
  <div id="app">
    <Header></Header>
    <!-- Sayfanın başlık veya navigasyon barı gibi bileşenler buraya gelebilir -->
    <router-view></router-view> <!-- Vue Router tarafından yönlendirilen bileşenler burada görüntülenir -->
  </div>
</template>

<script>

import Header from './components/Header.vue';

export default {
  name: 'App',
  // Burada projenizin genel ayarlarını veya verilerini tanımlayabilirsiniz
  components: {
    Header,
  },
};
</script>
