import request from '../utils/request'

// 新建歌单
export const addPlaylist = (data) => {
  return request.post('/capi/playlist/add', data)
}

// 添加歌曲到歌单
export const addSongToPlaylist = (data) => {
  return request.put('/capi/playlist/addSong', data)
}

// 删除歌单
export const deletePlaylist = (id) => {
  return request.delete('/capi/playlist/delete', {
    data: { id }
  })
}

// 删除歌单内歌曲
export const deleteSongFromPlaylist = (data) => {
  return request.delete('/capi/playlist/deleteSong', {
    data
  })
}

// 获取歌单详情
export const getPlaylistDetail = (id) => {
  return request.get('/capi/playlist/get', {
    params: { id }
  })
}

// 获取用户歌单列表
export const getUserPlaylists = (params) => {
  return request.get('/capi/playlist/page', {
    params
  })
}

// 获取歌单内歌曲列表
export const getPlaylistSongs = (params) => {
  return request.get('/capi/playlist/song/page', {
    params
  })
}

// 更新歌单信息
export const updatePlaylist = (data) => {
  return request.put('/capi/playlist/update', data)
} 