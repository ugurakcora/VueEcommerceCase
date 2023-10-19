<template>
  <div id="app">
    <!-- Sayfanın başlık veya navigasyon barı gibi bileşenler buraya gelebilir -->
    <router-view></router-view> <!-- Vue Router tarafından yönlendirilen bileşenler burada görüntülenir -->
  </div>
</template>

<script>
export default {
  name: 'App',
  // Burada projenizin genel ayarlarını veya verilerini tanımlayabilirsiniz
};
</script>

<style>
/* Burada genel stil tanımlamalarınızı yapabilirsiniz */
</style>
