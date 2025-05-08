<template>
  <div class="discover-playlist-container">
    <nav class="playlist-nav">
      <button :class="{active: tab==='recommend'}" @click="tab='recommend'">推荐</button>
      <button :class="{active: tab==='library'}" @click="tab='library'">音乐库</button>
    </nav>
    <div class="playlist-content">
      <component :is="currentComponent" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PlaylistRecommend from './PlaylistRecommend.vue'
import PlaylistLibrary from './PlaylistLibrary.vue'

const tab = ref('recommend')
const currentComponent = computed(() => {
  if(tab.value==='recommend') return PlaylistRecommend
  if(tab.value==='library') return PlaylistLibrary
  return PlaylistRecommend
})
</script>

<style scoped>
.discover-playlist-container {
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
}
.playlist-nav {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.playlist-nav button {
  padding: 0.5rem 1.5rem;
  border: none;
  background: #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
}
.playlist-nav button.active {
  background: #1db954;
  color: #fff;
}
</style>