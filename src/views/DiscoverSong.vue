<template>
  <div class="discover-song-container">
    <nav class="song-nav">
      <button :class="{active: tab==='recommend'}" @click="tab='recommend'">推荐</button>
      <button :class="{active: tab==='library'}" @click="tab='library'">音乐库</button>
    </nav>
    <div class="song-content">
      <component :is="currentComponent" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SongRecommend from './SongRecommend.vue'
import SongLibrary from './SongLibrary.vue'

const tab = ref('recommend')
const currentComponent = computed(() => {
  if(tab.value==='recommend') return SongRecommend
  if(tab.value==='library') return SongLibrary
  return SongRecommend
})
</script>

<style scoped>
.discover-song-container {
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
}
.song-nav {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.song-nav button {
  padding: 0.5rem 1.5rem;
  border: none;
  background: #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
}
.song-nav button.active {
  background: #1db954;
  color: #fff;
}
</style>