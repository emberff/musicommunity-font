import request from '../utils/request'

// 获取歌手详情
export const getSingerDetail = (id) => {
  return request.get('/capi/singer/get', {
    params: { id }
  })
} 