<template>
  <div class="playlist-detail">
    <header class="header">
      <div class="nav-buttons">
        <button @click="goBack" class="nav-btn">
          <i class="fas fa-arrow-left"></i> 返回主页
        </button>
        <button @click="goToPlaylistList" class="nav-btn">
          <i class="fas fa-list"></i> 我的歌单
        </button>
      </div>
    </header>

    <main class="main-content">
      <div class="playlist-info">
        <div class="cover-container">
          <img :src="playlist.cover || defaultCover" :alt="playlist.name" class="cover">
        </div>
        <div class="info">
          <h1>{{ playlist.name }}</h1>
          <p class="description">{{ playlist.description || '暂无描述' }}</p>
          <div class="meta">
            <span>创建者: {{ playlist.userName }}</span>
            <span>歌曲数: {{ playlist.plSongNum }}</span>
          </div>
        </div>
      </div>

      <div class="songs-list">
        <h2>歌曲列表</h2>
        <div class="songs">
          <div v-for="song in songs" :key="song.id" class="song-item" @click="goToSongDetail(song.id)" style="cursor:pointer;">
            <div class="song-info">
              <span class="song-name">{{ song.name }}</span>
              <!-- 移除不存在的singerName字段 -->
            </div>
            <img v-if="song.cover" :src="song.cover.replace(/`/g, '')" alt="cover" class="song-cover" />
            <div class="song-actions">
              <button @click.stop="playSong(song)" class="play-btn">
                <i class="fas fa-play"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getPlaylistDetail, addSongToPlaylist, deleteSongFromPlaylist } from '../api/playlist'

const route = useRoute()
const router = useRouter()
const playlist = ref({})
const songs = ref([])
const showAddSongDialog = ref(false)
const searchQuery = ref('')
const searchResults = ref([])
const defaultCover = 'https://p1.music.126.net/5s7KQlQd0mG7mZLPdUnkLQ==/109951163350929740.jpg'

const goBack = () => {
  router.push('/')
}

const goToPlaylistList = () => {
  router.push('/playlists')
}

const loadPlaylistDetail = async () => {
  try {
    const res = await getPlaylistDetail(route.params.id)
    if (res.data.success) {
      playlist.value = res.data.data
      console.log('歌曲数据:', res.data.data.songs)
      songs.value = res.data.data.songs || []
    }
  } catch (error) {
    console.error('加载歌单详情失败:', error)
  }
}

const playAll = () => {
  // TODO: 实现播放全部功能
}

const editPlaylist = () => {
  // TODO: 实现编辑歌单功能
}

const playSong = (song) => {
  // TODO: 实现播放歌曲功能
}

const addSong = async (songId) => {
  try {
    const res = await addSongToPlaylist({
      playlistId: route.params.id,
      songIds: [songId]
    })
    if (res.data.success) {
      loadSongs()
    }
  } catch (error) {
    console.error('添加歌曲失败:', error)
  }
}

const deleteSong = async (songId) => {
  try {
    const res = await deleteSongFromPlaylist({
      playlistId: route.params.id,
      songIds: [songId]
    })
    if (res.data.success) {
      loadSongs()
    }
  } catch (error) {
    console.error('删除歌曲失败:', error)
  }
}

const searchSongs = () => {
  // TODO: 实现搜索歌曲功能
}

onMounted(() => {
  loadPlaylistDetail()
})

const goToSongDetail = (songId) => {
  router.push({ path: `/song/${songId}` })
}
</script>

<style scoped>
.playlist-detail {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.header {
  background-color: #fff;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-buttons {
  display: flex;
  gap: 1rem;
}

.nav-btn {
  padding: 0.5rem 1rem;
  background-color: #1db954;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.3s;
}

.nav-btn:hover {
  background-color: #1ed760;
}

.main-content {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.playlist-info {
  display: flex;
  gap: 2rem;
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.cover-container {
  flex: 0 0 200px;
}

.cover {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}

.info {
  flex: 1;
}

.info h1 {
  margin: 0 0 1rem;
  font-size: 1.8rem;
  color: #333;
}

.description {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.meta {
  display: flex;
  gap: 1.5rem;
  color: #888;
  font-size: 0.9rem;
}

.songs-list {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.songs-list h2 {
  margin: 0 0 1.5rem;
  color: #333;
  font-size: 1.5rem;
}

.songs {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.song-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}
.song-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.song-cover {
  width: 48px;
  height: 48px;
  border-radius: 6px;
  margin-left: 1rem;
  object-fit: cover;
}
.song-actions {
  margin-left: 1rem;
}
.song-item:hover {
  background-color: #f8f8f8;
}

.song-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.song-name {
  font-weight: 500;
  color: #333;
}

.singer {
  font-size: 0.9rem;
  color: #666;
}

.play-btn {
  padding: 0.5rem;
  background: none;
  border: none;
  color: #1db954;
  cursor: pointer;
  transition: transform 0.3s;
}

.play-btn:hover {
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .playlist-info {
    flex-direction: column;
  }

  .cover-container {
    flex: none;
    text-align: center;
  }

  .cover {
    width: 150px;
    height: 150px;
  }
}
</style>