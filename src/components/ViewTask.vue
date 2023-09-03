<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
      scrollable
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">View Task</span>
        </v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            lazy-validation
          >
            <v-text-field
              v-model="name"
              label="Name"
              disabled
            ></v-text-field>
            <v-text-field
              v-model="description"
              label="Description"
              disabled
            ></v-text-field>
            <v-text-field
              v-model="launchTemplateId"
              label="Launch Template Id"
              disabled
            ></v-text-field>
            <v-text-field
              v-model="launchTemplateVersion"
              label="Launch Template Version"
              disabled
            ></v-text-field>
            <v-textarea
              label="Startup Script"
              v-model="startupScript"
              disabled
            ></v-textarea>
            <v-text-field
              v-model="timeoutSeconds"
              label="Timeout Seconds"
              disabled
              type="number"
            ></v-text-field>
            <v-text-field
              v-model="schedule"
              label="Schedule"
              disabled
            ></v-text-field>
            <v-text-field
              v-model="createdBy"
              label="Created By"
              disabled
            ></v-text-field>
            <v-text-field
              v-model="updatedBy"
              label="Updated By"
              disabled
            ></v-text-field>
            <v-text-field
              v-model="createdAt"
              label="Created At"
              disabled
            ></v-text-field>
            <v-text-field
              v-model="updatedAt"
              label="Updated At"
              disabled
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn
            :disabled="loading"
            @click="close"
            class="ma-2"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import eventBus from '@/event-bus'
import axios from '@/axios'
import UnauthorizedError from '@/error/unauthorized-error'
import EventTypes from '@/event-types'

export default {
  name: 'ViewTask',
  data () {
    return {
      dialog: false,
      loading: false,
      id: 0,
      name: '',
      description: '',
      launchTemplateId: '',
      launchTemplateVersion: null,
      startupScript: null,
      timeoutSeconds: 300,
      schedule: '',
      status: 0,
      createdBy: 0,
      updatedBy: 0,
      createdAt: '',
      updatedAt: ''
    }
  },
  methods: {
    close () {
      this.$refs.form.reset()
      this.dialog = false
    },
    getTask (id) {
      this.id = id
      this.loading = true

      axios.get(`/tasks/${this.id}`)
        .then((response) => {
          const task = response.data
          this.name = task.name
          this.description = task.description
          this.launchTemplateId = task.launchTemplateId
          this.launchTemplateVersion = task.launchTemplateVersion
          this.startupScript = task.startupScript
          this.timeoutSeconds = task.timeoutSeconds
          this.schedule = task.schedule
          this.createdBy = task.createdBy
          this.updatedBy = task.updatedBy
          this.createdAt = task.createdAt
          this.updatedAt = task.updatedAt
        })
        .catch((error) => {
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
  },
  created () {
    eventBus.$on(EventTypes.VIEW_TASK, (id) => {
      this.dialog = true
      this.getTask(id)
    })
  }
}
</script>
