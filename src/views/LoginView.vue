<template>
  <div class="container">
    <v-row justify="center">
      <v-col cols="4">
        <p class="text-h5 text-center">Login</p>
        <v-divider></v-divider>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="Name*"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Password*"
            type="password"
            required
          ></v-text-field>
          <div class="container text-center">
            <v-btn
              :disabled="!valid || loading"
              :loading="loading"
              @click="login"
            >
              Login
            </v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from '@/axios'

export default {
  name: 'Login',
  data () {
    return {
      valid: true,
      loading: false,
      name: '',
      password: '',
      nameRules: [
        v => !!v || 'Name cannot be empty'
      ],
      passwordRules: [
        v => !!v || 'Password cannot be empty'
      ]
    }
  },
  methods: {
    login () {
      if (!this.$refs.form.validate()) {
        return
      }

      this.loading = true

      const user = {
        name: this.name,
        password: this.password
      }

      axios.post('/auth/login', user)
        .then((response) => {
          const me = response.data
          localStorage.setItem('me', JSON.stringify(me))
          this.$store.commit('setMe', me)
          this.$router.push('/')
        })
        .catch((error) => {
          console.error(error)

          this.$toast.error(error.message)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
