<template>
  <div class="artist-recommend">
    <h3>推荐歌手</h3>
    <ul>
      <li v-for="artist in artists" :key="artist.id">
        <img :src="artist.avatar" alt="avatar" class="avatar" />
        <span>{{ artist.name }}</span>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const artists = ref([
  { id: 1, name: '假数据-歌手A', avatar: 'https://p1.music.126.net/avatarA.jpg' },
  { id: 2, name: '假数据-歌手B', avatar: 'https://p1.music.126.net/avatarB.jpg' },
  { id: 3, name: '假数据-歌手C', avatar: 'https://p1.music.126.net/avatarC.jpg' }
])
</script>
<style scoped>
.artist-recommend ul { list-style: none; padding: 0; }
.artist-recommend li { display: flex; align-items: center; margin-bottom: 1rem; }
.avatar { width: 48px; height: 48px; border-radius: 50%; margin-right: 1rem; object-fit: cover; }
</style>