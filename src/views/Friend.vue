<template>
  <div class="friend-container">
    <h2>好友管理</h2>
    <div class="friend-actions">
      <input v-model="searchUid" placeholder="输入好友UID" />
      <input v-model="applyMsg" placeholder="申请信息" />
      <button @click="handleApplyFriend">添加好友</button>
    </div>
    <div class="friend-list">
      <h3>我的好友</h3>
      <ul>
        <li v-for="friend in friends" :key="friend.uid">
          <span>{{ friend.uid }} ({{ friend.activeStatus === 1 ? '在线' : '离线' }})</span>
          <button @click="handleDeleteFriend(friend.uid)">删除</button>
          <button @click="startChat(friend.uid)">聊天</button>
        </li>
      </ul>
    </div>
    <div class="apply-list">
      <h3>好友申请</h3>
      <ul>
        <li v-for="apply in applyList" :key="apply.applyId">
          <span>来自UID: {{ apply.uid }}，信息: {{ apply.msg }}，状态: {{ apply.status === 1 ? '待审批' : '已同意' }}</span>
          <button v-if="apply.status === 1" @click="approveApply(apply.applyId)">同意</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getFriendList, applyFriend, getFriendApplyList, approveFriendApply, deleteFriend } from '../api/user'

const friends = ref([])
const applyList = ref([])
const searchUid = ref('')
const applyMsg = ref('')

const loadFriends = async () => {
  const res = await getFriendList({ pageSize: 20 })
  if (res.data.success) {
    friends.value = res.data.data.list
  }
}

const loadApplyList = async () => {
  const res = await getFriendApplyList({ pageNo: 1, pageSize: 20 })
  if (res.data.success) {
    applyList.value = res.data.data.list
  }
}

const handleApplyFriend = async () => {
  if (!searchUid.value) return alert('请输入好友UID')
  const res = await applyFriend({ targetUid: Number(searchUid.value), msg: applyMsg.value })
  if (res.data.success) {
    alert('申请已发送')
    loadApplyList()
  } else {
    alert(res.data.errorMsg || '申请失败')
  }
}

const approveApply = async (applyId) => {
  const res = await approveFriendApply({ applyId })
  if (res.data.success) {
    alert('已同意')
    loadApplyList()
    loadFriends()
  } else {
    alert(res.data.errorMsg || '操作失败')
  }
}

const handleDeleteFriend = async (uid) => {
  if (!confirm('确定删除该好友？')) return
  const res = await deleteFriend({ targetUid: uid })
  if (res.data.success) {
    alert('已删除')
    loadFriends()
  } else {
    alert(res.data.errorMsg || '删除失败')
  }
}

const startChat = (uid) => {
  // 跳转到聊天页面，后续实现
  alert('跳转到与好友 ' + uid + ' 聊天页面（待实现）')
}

onMounted(() => {
  loadFriends()
  loadApplyList()
})
</script>

<style scoped>
.friend-container {
  max-width: 600px;
  margin: 2rem auto;
  background: #fff;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.friend-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.friend-list, .apply-list {
  margin-top: 1.5rem;
}
ul {
  padding-left: 0;
  list-style: none;
}
li {
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}
button {
  background: #1db954;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.3rem 0.8rem;
  cursor: pointer;
}
button:hover {
  background: #159c43;
}
</style>