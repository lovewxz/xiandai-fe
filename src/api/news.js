import request from '@/utils/request'
import Config from '@/config'

export function create(data) {
  return request({
    url: `${Config.apiPrefix}/news`,
    method: 'post',
    data
  })
}

export function index(params) {
  return request({
    url: `${Config.apiPrefix}/news`,
    method: 'get',
    params
  })
}

export function update(id, data) {
  return request({
    url: `${Config.apiPrefix}/news/${id}`,
    method: 'put',
    data
  })
}

export function del(id) {
  return request({
    url: `${Config.apiPrefix}/news/${id}`,
    method: 'delete'
  })
}

export function edit(id) {
  return request({
    url: `${Config.apiPrefix}/news/${id}/edit`,
    method: 'get'
  })
}
