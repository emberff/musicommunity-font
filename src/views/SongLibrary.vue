<template>
  <div class="song-library">
    <h3>音乐库</h3>
    <div v-if="loading" class="loading">加载中...</div>
    <div v-else>
      <ul>
        <li v-for="song in songs" :key="song.id">
          <img :src="song.cover" alt="cover" class="cover" />
          <span>{{ song.name }}</span>
        </li>
      </ul>
      <div class="pagination">
        <button :disabled="pageNo===1" @click="changePage(pageNo-1)">上一页</button>
        <span>第{{ pageNo }}页 / 共{{ totalPages }}页</span>
        <button :disabled="isLast" @click="changePage(pageNo+1)">下一页</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
const songs = ref([])
const pageNo = ref(1)
const pageSize = ref(10)
const totalRecords = ref(0)
const isLast = ref(false)
const loading = ref(false)
const totalPages = computed(() => Math.ceil(totalRecords.value / pageSize.value))

const fetchSongs = async () => {
  loading.value = true
  try {
    const res = await axios.get('/capi/song/page', {
      params: { pageNo: pageNo.value, pageSize: pageSize.value }
    })
    if(res.data.success) {
      songs.value = res.data.data.list
      totalRecords.value = res.data.data.totalRecords
      isLast.value = res.data.data.isLast
    }
  } catch (e) {
    // 错误处理
  } finally {
    loading.value = false
  }
}
const changePage = (no) => {
  pageNo.value = no
  fetchSongs()
}
onMounted(fetchSongs)
</script>
<style scoped>
.song-library ul { list-style: none; padding: 0; }
.song-library li { display: flex; align-items: center; margin-bottom: 1rem; }
.cover { width: 48px; height: 48px; border-radius: 6px; margin-right: 1rem; object-fit: cover; }
.pagination { margin-top: 1rem; display: flex; align-items: center; gap: 1rem; }
.loading { color: #888; }
</style>