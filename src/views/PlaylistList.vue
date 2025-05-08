<template>
  <div class="playlist-list">
    <div class="header">
      <div class="left">
        <button class="back-btn" @click="goHome">返回主页</button>
        <h2>我的歌单</h2>
      </div>
      <button class="create-btn" @click="showCreateDialog = true">
        <i class="icon-plus"></i> 新建歌单
      </button>
    </div>

    <div class="playlist-container">
      <button class="nav-btn prev" @click="prevPage" :disabled="currentPage === 1">
        <i class="icon-arrow-left"></i>
      </button>
      
      <div class="playlist-grid">
        <div v-for="playlist in currentPlaylists" :key="playlist.id" class="playlist-card">
          <div class="cover" @click="goToPlaylist(playlist.id)">
            <img :src="playlist.cover || defaultCover" :alt="playlist.name">
            <div class="song-count">{{ playlist.plSongNum }}首</div>
          </div>
          <div class="info">
            <h3 @click="goToPlaylist(playlist.id)">{{ playlist.name }}</h3>
            <div class="actions">
              <button @click="editPlaylist(playlist)">编辑</button>
              <button @click="deletePlaylist(playlist.id)">删除</button>
            </div>
          </div>
        </div>
      </div>

      <button class="nav-btn next" @click="nextPage" :disabled="currentPage === totalPages">
        <i class="icon-arrow-right"></i>
      </button>
    </div>

    <div class="pagination">
      <span>第 {{ currentPage }} 页 / 共 {{ totalPages }} 页</span>
    </div>

    <!-- 新建歌单对话框 -->
    <div v-if="showCreateDialog" class="dialog-overlay">
      <div class="dialog">
        <h3>新建歌单</h3>
        <form @submit.prevent="createPlaylist">
          <div class="form-group">
            <label>歌单名称</label>
            <input v-model="newPlaylist.name" required>
          </div>
          <div class="form-group">
            <label>是否公开</label>
            <select v-model="newPlaylist.isPublic">
              <option :value="0">私密</option>
              <option :value="1">公开</option>
            </select>
          </div>
          <div class="form-group">
            <label>封面图片</label>
            <input v-model="newPlaylist.cover" placeholder="输入封面URL">
          </div>
          <div class="dialog-actions">
            <button type="button" @click="showCreateDialog = false">取消</button>
            <button type="submit">创建</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getUserPlaylists, addPlaylist, deletePlaylist } from '../api/playlist'

const router = useRouter()
const playlists = ref([])
const showCreateDialog = ref(false)
const newPlaylist = ref({
  name: '',
  isPublic: 0,
  cover: ''
})
const defaultCover = 'https://p1.music.126.net/5s7KQlQd0mG7mZLPdUnkLQ==/109951163350929740.jpg'

// 分页相关
const itemsPerPage = 6
const currentPage = ref(1)

const totalPages = computed(() => {
  return Math.ceil(playlists.value.length / itemsPerPage)
})

const currentPlaylists = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return playlists.value.slice(start, end)
})

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const goHome = () => {
  router.push('/')
}

const loadPlaylists = async () => {
  try {
    const res = await getUserPlaylists({
      pageNo: 1,
      pageSize: 20
    })
    if (res.data.success) {
      playlists.value = res.data.data.list
    }
  } catch (error) {
    console.error('加载歌单失败:', error)
  }
}

const createPlaylist = async () => {
  try {
    const res = await addPlaylist(newPlaylist.value)
    if (res.data.success) {
      showCreateDialog.value = false
      loadPlaylists()
      newPlaylist.value = {
        name: '',
        isPublic: 0,
        cover: ''
      }
    }
  } catch (error) {
    console.error('创建歌单失败:', error)
  }
}

const goToPlaylist = (id) => {
  router.push(`/playlist/${id}`)
}

const editPlaylist = (playlist) => {
  // TODO: 实现编辑功能
}

const handleDeletePlaylist = async (id) => {
  try {
    const res = await deletePlaylist(id)
    if (res.data.success) {
      loadPlaylists()
    }
  } catch (error) {
    console.error('删除歌单失败:', error)
  }
}

onMounted(() => {
  loadPlaylists()
})
</script>

<style scoped>
.playlist-list {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.back-btn {
  padding: 8px 16px;
  background: #1db954;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.create-btn {
  padding: 8px 16px;
  background: #1db954;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.playlist-container {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.nav-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #1db954;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.nav-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.playlist-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  overflow: hidden;
}

.pagination {
  text-align: center;
  color: #666;
  margin-top: 20px;
}

.playlist-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.cover {
  position: relative;
  aspect-ratio: 1;
  cursor: pointer;
}

.cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.song-count {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.info {
  padding: 12px;
}

.info h3 {
  margin: 0 0 8px;
  cursor: pointer;
}

.actions {
  display: flex;
  gap: 8px;
}

.actions button {
  padding: 4px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: none;
  cursor: pointer;
}

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.dialog {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
}

.dialog h3 {
  margin: 0 0 20px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 20px;
}

.dialog-actions button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.dialog-actions button[type="button"] {
  background: #f5f5f5;
}

.dialog-actions button[type="submit"] {
  background: #1db954;
  color: white;
}
</style> 