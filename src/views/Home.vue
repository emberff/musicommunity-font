<template>
  <div class="home-container">
    <header class="header">
      <div class="logo">MusicCommunity</div>
      <div class="user-info">
        <span>{{ userInfo?.name || '未登录' }}</span>
        <button @click="handleLogout" class="logout-btn">退出登录</button>
      </div>
    </header>
    <main class="main-content">
      <div class="sections">
        <section class="section discover">
          <h2>发现音乐</h2>
          <div class="content">
            <!-- 发现音乐内容 -->
            <p>探索新音乐，发现新世界</p>
          </div>
        </section>

        <section class="section playlists">
          <h2 @click="goToPlaylistList" class="section-title">我的歌单</h2>
          <div class="content">
            <div class="playlist-grid">
              <div v-for="playlist in displayedPlaylists" :key="playlist.id" class="playlist-card">
                <div class="cover" @click="goToPlaylist(playlist.id)">
                  <img :src="playlist.cover || defaultCover" :alt="playlist.name">
                  <div class="song-count">{{ playlist.plSongNum }}首</div>
                </div>
                <div class="info">
                  <h3 @click="goToPlaylist(playlist.id)">{{ playlist.name }}</h3>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'
import { getUserInfo } from '../api/user'
import { getUserPlaylists } from '../api/playlist'

const router = useRouter()
const authStore = useAuthStore()
const userInfo = ref(null)
const playlists = ref([])
const defaultCover = 'https://p1.music.126.net/5s7KQlQd0mG7mZLPdUnkLQ==/109951163350929740.jpg'

const loadUserInfo = async () => {
  try {
    const res = await getUserInfo()
    if (res.data.success) {
      userInfo.value = res.data.data
    }
  } catch (error) {
    console.error('获取用户信息失败:', error)
  }
}

const loadPlaylists = async () => {
  try {
    const res = await getUserPlaylists({
      pageNo: 1,
      pageSize: 6
    })
    if (res.data.success) {
      playlists.value = res.data.data.list
    }
  } catch (error) {
    console.error('加载歌单失败:', error)
  }
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

const goToPlaylist = (id) => {
  router.push(`/playlist/${id}`)
}

const displayedPlaylists = computed(() => playlists.value.slice(0, 2))

const goToPlaylistList = () => {
  router.push('/playlists')
}

onMounted(() => {
  loadUserInfo()
  loadPlaylists()
})
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.header {
  background-color: #fff;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1db954;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logout-btn {
  padding: 0.5rem 1rem;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.main-content {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.sections {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.section {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.section h2 {
  margin: 0 0 1.5rem;
  color: #333;
  font-size: 1.5rem;
}

.content {
  min-height: 200px;
}

.playlist-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.playlist-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  margin: 0;
  font-size: 1rem;
  cursor: pointer;
}

@media (max-width: 768px) {
  .sections {
    grid-template-columns: 1fr;
  }
  
  .playlist-grid {
    grid-template-columns: 1fr;
  }
}

.section-title {
  margin: 0 0 1.5rem;
  color: #333;
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s;
}

.section-title:hover {
  color: #1db954;
}
</style> 