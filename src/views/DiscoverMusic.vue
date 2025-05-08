<template>
  <div class="discover-music-container">
    <nav class="discover-nav">
      <button :class="{active: tab==='song'}" @click="tab='song'">歌曲</button>
      <button :class="{active: tab==='artist'}" @click="tab='artist'">歌手</button>
      <button :class="{active: tab==='playlist'}" @click="tab='playlist'">歌单</button>
    </nav>
    <div class="discover-content">
      <component :is="currentComponent" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import DiscoverSong from './DiscoverSong.vue'
import DiscoverArtist from './DiscoverArtist.vue'
import DiscoverPlaylist from './DiscoverPlaylist.vue'

const tab = ref('song')
const currentComponent = computed(() => {
  if(tab.value==='song') return DiscoverSong
  if(tab.value==='artist') return DiscoverArtist
  if(tab.value==='playlist') return DiscoverPlaylist
  return DiscoverSong
})
</script>

<style scoped>
.discover-music-container {
  background: #f5f5f5;
  border-radius: 12px;
  padding: 1.5rem;
}
.discover-nav {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.discover-nav button {
  padding: 0.5rem 1.5rem;
  border: none;
  background: #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
}
.discover-nav button.active {
  background: #1db954;
  color: #fff;
}
</style>