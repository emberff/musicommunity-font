<template>
  <div class="chat-container">
    <h2>{{ chatTitle }}</h2>
    <div class="chat-messages">
      <div v-for="msg in messages" :key="msg.id" :class="['chat-message', msg.isSelf ? 'self' : '']">
        <span class="chat-uid">{{ msg.uid }}:</span>
        <span class="chat-content">{{ msg.content }}</span>
        <span class="chat-time">{{ msg.time }}</span>
      </div>
    </div>
    <div class="chat-input">
      <input v-model="inputMsg" @keyup.enter="sendMessage" placeholder="输入消息..." />
      <button @click="sendMessage">发送</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
// 后续可引入实际的消息API
// import { getChatMessages, sendChatMessage } from '../api/chat'

const route = useRoute()
const chatType = route.query.type || 'single' // single/group
const targetUid = route.query.uid || ''
const chatTitle = chatType === 'group' ? `群聊 ${targetUid}` : `与好友 ${targetUid} 聊天`

const messages = ref([
  // 示例数据，后续替换为接口获取
  { id: 1, uid: targetUid, content: '你好！', time: '10:00', isSelf: false },
  { id: 2, uid: '我', content: '你好，有什么事吗？', time: '10:01', isSelf: true }
])
const inputMsg = ref('')

const sendMessage = () => {
  if (!inputMsg.value.trim()) return
  messages.value.push({
    id: Date.now(),
    uid: '我',
    content: inputMsg.value,
    time: new Date().toLocaleTimeString(),
    isSelf: true
  })
  inputMsg.value = ''
  // 后续可调用sendChatMessage接口
}

onMounted(() => {
  // 后续可调用getChatMessages接口加载历史消息
})
</script>

<style scoped>
.chat-container {
  max-width: 600px;
  margin: 2rem auto;
  background: #fff;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  height: 70vh;
}
.chat-messages {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 1rem;
  background: #f7f7f7;
  border-radius: 6px;
  padding: 1rem;
}
.chat-message {
  margin-bottom: 0.5rem;
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}
.chat-message.self {
  justify-content: flex-end;
  color: #1db954;
}
.chat-uid {
  font-weight: bold;
}
.chat-content {
  background: #e6e6e6;
  border-radius: 4px;
  padding: 0.2rem 0.6rem;
}
.chat-message.self .chat-content {
  background: #d2f8e5;
}
.chat-time {
  font-size: 0.8em;
  color: #888;
}
.chat-input {
  display: flex;
  gap: 1rem;
}
.chat-input input {
  flex: 1;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}
.chat-input button {
  background: #1db954;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.4rem 1.2rem;
  cursor: pointer;
}
.chat-input button:hover {
  background: #159c43;
}
</style>