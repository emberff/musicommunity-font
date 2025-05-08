<template>
  <div class="song-recommend">
    <h3>推荐歌曲</h3>
    <ul>
      <li v-for="song in songs" :key="song.id">
        <img :src="song.cover" alt="cover" class="cover" />
        <span>{{ song.name }}</span>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const songs = ref([
  { id: 1, name: '假数据-歌曲A', cover: 'https://p1.music.126.net/coverA.jpg' },
  { id: 2, name: '假数据-歌曲B', cover: 'https://p1.music.126.net/coverB.jpg' },
  { id: 3, name: '假数据-歌曲C', cover: 'https://p1.music.126.net/coverC.jpg' }
])
</script>
<style scoped>
.song-recommend ul { list-style: none; padding: 0; }
.song-recommend li { display: flex; align-items: center; margin-bottom: 1rem; }
.cover { width: 48px; height: 48px; border-radius: 6px; margin-right: 1rem; object-fit: cover; }
</style>