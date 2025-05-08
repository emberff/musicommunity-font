import request from '../utils/request'

// 获取歌曲详情
export const getSongDetail = (id) => {
  return request.get('/capi/song/get', {
    params: { id }
  })
} 