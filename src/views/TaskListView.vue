<template>
  <div class="container">
    <Overlay :loading="loading"></Overlay>
    <div class="container">
      <Navigation></Navigation>
      <p>List</p>
    </div>
  </div>
</template>

<script>
import Overlay from '@/components/Overlay.vue'
import Navigation from '@/components/Navigation.vue'

export default {
  name: 'Home',
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
