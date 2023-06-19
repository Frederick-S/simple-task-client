<template>
  <div>
    <Overlay :loading="loading"></Overlay>
    <div>
      <v-row>
        <v-col cols="2">
          <Navigation></Navigation>
        </v-col>
        <v-col>
          <div class="container">
            <div class="text-center">
              <v-btn class="ma-2" @click="createTask">
                Create Task
                <v-icon
                  right
                  dark
                >
                  mdi-plus
                </v-icon>
              </v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
    <CreateTask></CreateTask>
  </div>
</template>

<script>
import Overlay from '@/components/Overlay.vue'
import Navigation from '@/components/Navigation.vue'
import axios from '@/axios'
import UnauthorizedError from '@/error/unauthorized-error'
import CreateTask from '@/components/CreateTask.vue'
import eventBus from '@/event-bus'
import EventTypes from '@/event-types'

export default {
  name: 'Home',
  components: {
    Overlay,
    Navigation,
    CreateTask
  },
  computed: {
    me () {
      return this.$store.state.me
    }
  },
  data () {
    return {
      loading: true,
      page: 1,
      pageSize: 20,
      tasks: []
    }
  },
  methods: {
    createTask () {
      eventBus.$emit(EventTypes.CREATE_TASK)
    }
  },
  created () {
    axios.get(`/tasks?page=${this.page}&pageSize=${this.pageSize}`)
      .then(data => {
        this.tasks = data
      })
      .catch(error => {
        console.error(error)

        if (error instanceof UnauthorizedError) {
          this.$router.push('/login')
        } else {
          this.$toast.error(error.message)
        }
      })
      .finally(() => {
        this.loading = false
      })
  }
}
</script>
