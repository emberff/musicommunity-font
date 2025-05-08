<template>
  <div class="discover-artist-container">
    <nav class="artist-nav">
      <button :class="{active: tab==='recommend'}" @click="tab='recommend'">推荐</button>
      <button :class="{active: tab==='library'}" @click="tab='library'">音乐库</button>
    </nav>
    <div class="artist-content">
      <component :is="currentComponent" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ArtistRecommend from './ArtistRecommend.vue'
import ArtistLibrary from './ArtistLibrary.vue'

const tab = ref('recommend')
const currentComponent = computed(() => {
  if(tab.value==='recommend') return ArtistRecommend
  if(tab.value==='library') return ArtistLibrary
  return ArtistRecommend
})
</script>

<style scoped>
.discover-artist-container {
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
}
.artist-nav {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.artist-nav button {
  padding: 0.5rem 1.5rem;
  border: none;
  background: #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
}
.artist-nav button.active {
  background: #1db954;
  color: #fff;
}
</style>