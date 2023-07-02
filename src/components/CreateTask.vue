<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Create Task</span>
        </v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="name"
              :counter="100"
              :rules="nameRules"
              label="Name*"
              required
            ></v-text-field>
            <v-text-field
              v-model="description"
              :counter="255"
              :rules="descriptionRules"
              label="Description*"
              required
            ></v-text-field>
            <v-text-field
              v-model="launchTemplateId"
              :counter="100"
              :rules="launchTemplateIdRules"
              label="Launch Template Id*"
              required
            ></v-text-field>
            <v-text-field
              v-model="launchTemplateVersion"
              :counter="10"
              :rules="launchTemplateVersionRules"
              label="Launch Template Version*"
              required
            ></v-text-field>
            <v-textarea
              clearable
              clear-icon="mdi-close-circle"
              label="Startup Script*"
              v-model="startupScript"
              :rules="startupScriptRules"
              required
            ></v-textarea>
            <v-text-field
              v-model="timeoutSeconds"
              :rules="timeoutSecondsRules"
              label="Timeout Seconds*"
              required
              type="number"
            ></v-text-field>
            <v-select
              v-model="status"
              :items="statusList"
              item-text="status"
              item-value="value"
              label="Status"
              required
            ></v-select>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn
            :disabled="!valid || loading"
            :loading="loading"
            @click="create"
            class="ma-2"
          >
            添加
          </v-btn>
          <v-btn
            :disabled="loading"
            @click="close"
            class="ma-2"
          >
            取消
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
  name: 'CreateTask',
  data () {
    return {
      dialog: false,
      valid: true,
      loading: false,
      name: '',
      nameRules: [
        v => !!v || 'Name could not be empty',
        v => (v && v.length <= 100) || 'The length of name could not be longer than 100'
      ],
      description: '',
      descriptionRules: [
        v => !!v || 'Description could not be empty',
        v => (v && v.length <= 255) || 'The length of description could not be longer than 255'
      ],
      launchTemplateId: '',
      launchTemplateIdRules: [
        v => !!v || 'launchTemplateId could not be empty',
        v => (v && v.length <= 100) || 'The length of launchTemplateId could not be longer than 100'
      ],
      launchTemplateVersion: null,
      launchTemplateVersionRules: [
        v => !!v || 'launchTemplateVersion could not be empty',
        v => (v && v.length <= 10) || 'The length of launchTemplateVersion could not be longer than 10'
      ],
      startupScript: null,
      startupScriptRules: [
        v => !!v || 'startupScript could not be empty'
      ],
      timeoutSeconds: 300,
      timeoutSecondsRules: [
        v => !!v || 'timeoutSeconds could not be empty',
        v => (v && parseInt(v) > 0) || 'The value of timeoutSeconds should be greater than 0'
      ],
      status: 1,
      statusRules: [
        v => !!v || 'status could not be empty'
      ],
      statusList: [
        {
          status: 'Enabled',
          value: 1
        },
        {
          status: 'Disabled',
          value: 2
        }
      ]
    }
  },
  methods: {
    close () {
      this.$refs.form.reset()
      this.dialog = false
    },
    create () {
      if (!this.$refs.form.validate()) {
        return
      }

      this.loading = true

      const task = {
        name: this.name,
        description: this.description,
        launchTemplateId: this.launchTemplateId,
        launchTemplateVersion: this.launchTemplateVersion,
        startupScript: this.startupScript,
        timeoutSeconds: this.timeoutSeconds,
        status: this.status
      }

      axios.post('/tasks', task)
        .then((response) => {
          this.close()

          eventBus.$emit(EventTypes.TASK_CREATED, response)
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
    eventBus.$on(EventTypes.CREATE_TASK, () => {
      this.dialog = true
    })
  }
}
</script>
