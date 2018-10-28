import request from '@/utils/request'
import Config from '@/config'

export function create(data) {
  return request({
    url: `${Config.apiPrefix}/case`,
    method: 'post',
    data
  })
}

export function index(params) {
  return request({
    url: `${Config.apiPrefix}/case`,
    method: 'get',
    params
  })
}

export function update(id, data) {
  return request({
    url: `${Config.apiPrefix}/case/${id}`,
    method: 'put',
    data
  })
}

export function del(id) {
  return request({
    url: `${Config.apiPrefix}/case/${id}`,
    method: 'delete'
  })
}

export function edit(id) {
  return request({
    url: `${Config.apiPrefix}/case/${id}/edit`,
    method: 'get'
  })
}
