import request from '@/utils/request'
import Config from '@/config'

export function create(data) {
  return request({
    url: `${Config.apiPrefix}/contentClass`,
    method: 'post',
    data
  })
}

export function index() {
  return request({
    url: `${Config.apiPrefix}/contentClass`,
    method: 'get'
  })
}

export function update(data) {
  return request({
    url: `${Config.apiPrefix}/contentClass/${data.class_id}`,
    method: 'put',
    data
  })
}

export function del(id) {
  return request({
    url: `${Config.apiPrefix}/contentClass/${id}`,
    method: 'delete'
  })
}
