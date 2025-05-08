import { defineStore } from 'pinia'
import axios from 'axios'
import Cookies from 'js-cookie'
import { login, register } from '../api/user'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: Cookies.get('token') || null,
    user: null,
    ws: null,
    heartbeatInterval: null
  }),

  actions: {
    async login(phoneNumber) {
      try {
        const response = await login(phoneNumber)
        if (response.data.success) {
          this.token = response.data.data.token
          Cookies.set('token', this.token)
          this.connectWebSocket()
          return true
        }
        return false
      } catch (error) {
        console.error('Login failed:', error)
        return false
      }
    },

    async register(phoneNumber) {
      try {
        const response = await register({ phone: phoneNumber })
        if (response.data.success) {
          this.token = response.data.data.token
          Cookies.set('token', this.token)
          this.connectWebSocket()
          return true
        }
        return false
      } catch (error) {
        console.error('Registration failed:', error)
        return false
      }
    },

    logout() {
      this.token = null
      Cookies.remove('token')
      this.disconnectWebSocket()
    },

    connectWebSocket() {
      if (this.ws) {
        this.ws.close()
      }

      this.ws = new WebSocket('ws://localhost:8090')

      this.ws.onopen = () => {
        // Send authentication message
        this.ws.send(JSON.stringify({
          type: 1,
          token: this.token
        }))

        // Start heartbeat
        this.startHeartbeat()
      }

      this.ws.onclose = () => {
        this.stopHeartbeat()
      }
    },

    disconnectWebSocket() {
      if (this.ws) {
        this.ws.close()
        this.ws = null
      }
      this.stopHeartbeat()
    },

    startHeartbeat() {
      this.heartbeatInterval = setInterval(() => {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
          this.ws.send(JSON.stringify({
            type: 2
          }))
        }
      }, 30000)
    },

    stopHeartbeat() {
      if (this.heartbeatInterval) {
        clearInterval(this.heartbeatInterval)
        this.heartbeatInterval = null
      }
    }
  }
}) 