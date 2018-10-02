import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/userAccess/login',
    method: 'post',
    data: {
      login_name: username,
      login_pwd: password
    }
  })
}

export function getInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/userAccess/logout',
    method: 'post'
  })
}
