<template>
  <div class="auth-form">
    <div class="form-container">
      <div class="form-header">
        <h2>{{ isLogin ? '登录' : '注册' }}</h2>
        <p class="subtitle">{{ isLogin ? '欢迎回来' : '创建新账号' }}</p>
      </div>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <div class="input-group">
            <i class="icon-phone"></i>
            <input
              type="tel"
              id="phone"
              v-model="phoneNumber"
              placeholder="请输入手机号"
              required
              pattern="[0-9]{11}"
            />
          </div>
        </div>
        <button type="submit" :disabled="isLoading" class="submit-btn">
          <span v-if="!isLoading">{{ isLogin ? '登录' : '注册' }}</span>
          <div v-else class="loading-spinner"></div>
        </button>
        <p class="switch-form">
          {{ isLogin ? '还没有账号？' : '已有账号？' }}
          <a href="#" @click.prevent="toggleForm" class="switch-link">
            {{ isLogin ? '立即注册' : '立即登录' }}
          </a>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'

const router = useRouter()
const authStore = useAuthStore()

const isLogin = ref(true)
const phoneNumber = ref('')
const isLoading = ref(false)

const toggleForm = () => {
  isLogin.value = !isLogin.value
}

const handleSubmit = async () => {
  if (!phoneNumber.value.match(/^[0-9]{11}$/)) {
    alert('请输入有效的手机号')
    return
  }

  isLoading.value = true
  try {
    const success = isLogin.value
      ? await authStore.login(phoneNumber.value)
      : await authStore.register(phoneNumber.value)

    if (success) {
      router.push('/')
    } else {
      alert(isLogin.value ? '登录失败' : '注册失败')
    }
  } catch (error) {
    console.error('Error:', error)
    alert('操作失败，请重试')
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.auth-form {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 0;
}

.form-container {
  background: rgba(255, 255, 255, 0.95);
  padding: 2.5rem;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 300px;
  min-width: unset;
  max-width: 90vw;
  backdrop-filter: blur(10px);
  margin: 0 auto;
  transition: all 0.3s ease;
}

@media (min-width: 768px) {
  .form-container {
    width: 340px;
    min-width: 300px;
    padding: 3rem;
  }
  
  .form-group {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  input {
    flex: 1;
    padding: 1rem;
    transition: box-shadow 0.3s ease;
  }

  input:focus {
    box-shadow: 0 0 8px rgba(76, 175, 80, 0.3);
    outline: none;
  }

  button {
    width: auto;
    padding: 1rem 2.5rem;
    margin-top: 1.5rem;
  }
}

h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #666;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #45a049;
}

.switch-form {
  text-align: center;
  margin-top: 1rem;
  color: #666;
}

a {
  color: #4CAF50;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>