<template>
  <div class="playlist-recommend">
    <h3>推荐歌单</h3>
    <ul>
      <li v-for="playlist in playlists" :key="playlist.id">
        <img :src="playlist.cover" alt="cover" class="cover" />
        <span>{{ playlist.name }}</span>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const playlists = ref([
  { id: 1, name: '假数据-歌单A', cover: 'https://p1.music.126.net/coverA.jpg' },
  { id: 2, name: '假数据-歌单B', cover: 'https://p1.music.126.net/coverB.jpg' },
  { id: 3, name: '假数据-歌单C', cover: 'https://p1.music.126.net/coverC.jpg' }
])
</script>
<style scoped>
.playlist-recommend ul { list-style: none; padding: 0; }
.playlist-recommend li { display: flex; align-items: center; margin-bottom: 1rem; }
.cover { width: 48px; height: 48px; border-radius: 6px; margin-right: 1rem; object-fit: cover; }
</style>