<template>
  <v-navigation-drawer
    absolute
    permanent
    left
  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6">
          Simple Task
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list nav>
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          @click="select(item)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
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
      selectedItem: 0,
      items: [
        {
          title: 'Home',
          icon: 'mdi-home',
          href: '/'
        },
        {
          title: 'Tasks',
          icon: 'mdi-server',
          href: '/tasks'
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
    select (item, i) {
      this.$router.push(item.href)
    }
  },
  mounted () {
    for (let i = 0; i < this.items.length; i++) {
      if (this.$route.path === this.items[i].href) {
        this.selectedItem = i
      }
    }
  }
}
</script>
