<template>
  <div class="login-container">
    <div class="page-header">
      <h1 class="project-title">MusicCommunity</h1>
    </div>
    <AuthForm />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import AuthForm from '../components/AuthForm.vue'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  /* background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); */
  background: transparent;
}

.page-header {
  background: #fff;
  padding: 1rem 2rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.project-title {
  color: #333;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  text-shadow: none;
}

.back-btn {
  padding: 0.5rem 1rem;
  background-color: #1db954;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.back-btn:hover {
  background-color: #1ed760;
}
</style>