import request from '@/utils/request'
import Config from '@/config'

export function create(data) {
  return request({
    url: `${Config.apiPrefix}/doctor`,
    method: 'post',
    data
  })
}

export function index() {
  return request({
    url: `${Config.apiPrefix}/doctor`,
    method: 'get'
  })
}

export function update(data) {
  return request({
    url: `${Config.apiPrefix}/doctor/${data.class_id}`,
    method: 'put',
    data
  })
}

export function del(id) {
  return request({
    url: `${Config.apiPrefix}/doctor/${id}`,
    method: 'delete'
  })
}
