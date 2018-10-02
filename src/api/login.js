import request from '@/utils/request'
import Config from '@/config'

export function login(username, password) {
  return request({
    url: `${Config.apiPrefix}/userAccess/login`,
    method: 'post',
    data: {
      login_name: username,
      login_pwd: password
    }
  })
}

export function getInfo() {
  return request({
    url: `${Config.apiPrefix}/user/info`,
    method: 'get'
  })
}

export function logout() {
  return request({
    url: `${Config.apiPrefix}/userAccess/logout`,
    method: 'post'
  })
}
