<template>
  <v-navigation-drawer
    absolute
    permanent
    left
  >
    <v-divider></v-divider>
    <v-list dense>
      <v-list-item
        v-for="item in items"
        :key="item.title"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn block @click="signOut">
          Sign out
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import axios from '@/axios'

export default {
  data () {
    return {
      items: [
        {
          title: 'Home',
          icon: 'mdi-home'
        },
        {
          title: 'Tasks',
          icon: 'mdi-server'
        },
        {
          title: 'Settings',
          icon: 'mdi-account-settings'
        }
      ]
    }
  },
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
          this.$router.push('/login')
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
