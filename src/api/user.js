import request from '../utils/request'

// 用户登录
export const login = (phone) => {
  return request.get('/capi/user/public/login', {
    params: { phone }
  })
}

// 用户注册
export const register = (userInfo) => {
  return request.post('/capi/user/public/register', userInfo)
}

// 获取用户信息
export const getUserInfo = () => {
  return request.get('/capi/user/userInfo')
}

// 获取好友列表
export const getFriendList = (params) => {
  return request.get('/capi/user/friend/page', { params })
}

// 申请添加好友
export const applyFriend = (data) => {
  return request.post('/capi/user/friend/apply', data)
}

// 获取好友申请列表
export const getFriendApplyList = (params) => {
  return request.get('/capi/user/friend/apply/page', { params })
}

// 审批同意好友申请
export const approveFriendApply = (data) => {
  return request.put('/capi/user/friend/apply', data)
}

// 删除好友
export const deleteFriend = (data) => {
  return request.delete('/capi/user/friend', { data })
}