<template>
  <div class="container">
    <v-app-bar
      fixed
      color="white"
    >
      <v-col cols="2"></v-col>
      <v-toolbar-title class="navigation-tab pointer" @click="goToHome">Simple Task</v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="me">
        <span>{{ me.name }}</span>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              plain
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-menu</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item class="pointer" @click="$router.push('/admin/settings')"
            >
              <v-list-item-title>Settings</v-list-item-title>
            </v-list-item>
            <v-list-item class="pointer" @click="signOut"
            >
              <v-list-item-title>Sign out</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <v-col cols="2"></v-col>
    </v-app-bar>
  </div>
</template>

<script>
import axios from '@/axios'

export default {
  name: 'Navigation',
  computed: {
    me () {
      return this.$store.state.me
    }
  },
  methods: {
    signOut () {
      axios.post('/auth/signOut')
        .then((response) => {
          localStorage.removeItem('me')
          this.$store.commit('setMe', null)

          if (this.$route.name !== 'Home') {
            this.$router.push('/')
          }
        })
        .catch((error) => {
          console.error(error)

          this.$toast.error(error.message)
        })
    },
    goToHome () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.pointer {
  cursor: pointer;
}

.navigation-tab {
  margin: 12px;
}
</style>
