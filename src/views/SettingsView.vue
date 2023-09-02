<template>
  <div class="container">
    <Overlay :loading="loading"></Overlay>
    <div class="container">
      <Navigation></Navigation>
    </div>
  </div>
</template>

<script>
import Overlay from '@/components/Overlay.vue'
import Navigation from '@/components/Navigation.vue'

export default {
  name: 'Settings',
  components: {
    Overlay,
    Navigation
  },
  data () {
    return {
      loading: false
    }
  },
  created () {
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}

.pointer {
  cursor: pointer;
}
</style>
