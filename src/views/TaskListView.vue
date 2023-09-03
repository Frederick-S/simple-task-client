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
          <v-row justify="center" v-if="!loading">
            <div class="container" v-if="tasks.length > 0">
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                  <tr>
                    <th class="text-center">Id</th>
                    <th class="text-center">Name</th>
                    <th class="text-center">Description</th>
                    <th class="text-center">Schedule</th>
                    <th class="text-center">Status</th>
                    <th class="text-center">Created By</th>
                    <th class="text-center">Updated By</th>
                    <th class="text-center">Created At</th>
                    <th class="text-center">Updated At</th>
                    <th class="text-center">Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(task) in tasks" :key="task.id">
                    <td class="text-center">{{ task.id }}</td>
                    <td class="text-center">{{ task.name }}</td>
                    <td class="text-center">{{ task.description }}</td>
                    <td class="text-center">{{ task.schedule }}</td>
                    <td class="text-center">{{ task.status === 1 ? 'Enabled' : 'Disabled' }}</td>
                    <td class="text-center">{{ task.createdBy }}</td>
                    <td class="text-center">{{ task.updatedBy }}</td>
                    <td class="text-center">{{ task.createdAt }}</td>
                    <td class="text-center">{{ task.updatedAt }}</td>
                    <td class="text-center">
                      <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            icon
                            plain
                            v-bind="attrs"
                            v-on="on"
                          >
                            <v-icon>mdi-cog</v-icon>
                          </v-btn>
                        </template>
                        <v-list>
                          <v-list-item class="pointer" @click="viewTask(task)"
                          >
                            <v-list-item-title>View</v-list-item-title>
                          </v-list-item>
                          <v-list-item class="pointer" @click="editTask(task)"
                          >
                            <v-list-item-title>Edit</v-list-item-title>
                          </v-list-item>
                          <v-list-item class="pointer" @click="deleteTask(task)"
                          >
                            <v-list-item-title>Delete</v-list-item-title>
                          </v-list-item>
                          <template v-if="task.status === 1">
                            <v-list-item class="pointer" @click="disableTask(task)"
                            >
                              <v-list-item-title>Disable</v-list-item-title>
                            </v-list-item>
                          </template>
                          <template v-else>
                            <v-list-item class="pointer" @click="enableTask(task)"
                            >
                              <v-list-item-title>Enable</v-list-item-title>
                            </v-list-item>
                          </template>
                        </v-list>
                      </v-menu>
                    </td>
                  </tr>
                  </tbody>
                </template>
              </v-simple-table>
              <v-container>
                <v-row justify="center">
                  <v-col cols="8">
                    <v-container class="max-width">
                      <v-pagination
                        v-model="page"
                        class="my-4"
                        :length="totalPages"
                        :total-visible="5"
                      ></v-pagination>
                    </v-container>
                  </v-col>
                </v-row>
              </v-container>
            </div>
            <div class="container" v-else>
              <p class="text-body-1 text-center">No tasks</p>
            </div>
          </v-row>
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
      tasks: [],
      page: 1,
      pageSize: 10,
      totalPages: 0
    }
  },
  methods: {
    getTasks (page) {
      this.loading = true

      if (page) {
        this.page = page
      }

      axios.get(`/tasks?page=${this.page}&pageSize=${this.pageSize}`)
        .then(data => {
          this.tasks = data.data
          this.totalPages = data.meta.totalPages
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
    },
    createTask () {
      eventBus.$emit(EventTypes.CREATE_TASK)
    },
    viewTask () {
    },
    editTask (task) {
    },
    deleteTask (task) {
    },
    disableTask (task) {
    },
    enableTask (task) {
    }
  },
  created () {
    this.getTasks()

    eventBus.$on(EventTypes.TASK_CREATED, () => {
      this.getTasks(1)
    })
  }
}
</script>
