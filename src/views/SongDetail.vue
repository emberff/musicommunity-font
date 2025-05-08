<template>
    <div class="song-detail">
      <header class="header">
        <button @click="goBack" class="nav-btn">
          <i class="fas fa-arrow-left"></i> 返回
        </button>
      </header>
      <main class="main-content">
        <div class="song-info">
          <div class="cover-container">
            <img :src="song.cover || defaultCover" :alt="song.songName" class="cover" />
          </div>
          <div class="info">
            <h1>{{ song.songName }}</h1>
            <p class="singer">歌手: {{ song.singerName }}</p>
            <p class="album">专辑: {{ song.playlistName }}</p>
          </div>
        </div>
  
        <!-- 播放器部分 -->
        <div class="player">
          <audio v-if="audioUrl" :src="audioUrl" controls class="audio-player"></audio>
          <p v-else>歌曲播放链接不可用</p>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { getSongDetail } from '../api/song'
  
  const route = useRoute()
  const router = useRouter()
  const song = ref({})
  const defaultCover = 'https://p1.music.126.net/5s7KQlQd0mG7mZLPdUnkLQ==/109951163350929740.jpg'
  const audioUrl = ref('')
  
  // 返回按钮
  const goBack = () => {
    router.back()
  }
  
  // 加载歌曲信息
  const loadSongDetail = async () => {
    try {
      const res = await getSongDetail(route.params.id)
      if (res.data.success) {
        song.value = res.data.data
        await loadJamendoAudioUrl(song.value.id) // 加载播放链接
      }
    } catch (error) {
      console.error('加载歌曲详情失败:', error)
    }
  }
  
  // 从 Jamendo 获取播放链接
  const loadJamendoAudioUrl = async (jamendoId) => {
    try {
      const response = await fetch(
        `https://api.jamendo.com/v3.0/tracks/?client_id=f16a23e3&id=168&format=json&audioformat=mp31`
      )
      const data = await response.json()
      audioUrl.value = data.results?.[0]?.audio || ''
    } catch (err) {
      console.error('获取播放链接失败:', err)
    }
  }
  
  onMounted(() => {
    loadSongDetail()
  })
  </script>
  
  <style scoped>
  .song-detail {
    min-height: 100vh;
    background-color: #f5f5f5;
  }
  
  .header {
    background-color: #fff;
    padding: 1rem 2rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
    max-width: 800px;
    margin: 0 auto;
  }
  
  .song-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .cover {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
  }
  
  .player {
    margin-top: 2rem;
    text-align: center;
  }
  
  .player .audio-player {
    width: 100%;
    max-width: 600px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  </style>
  