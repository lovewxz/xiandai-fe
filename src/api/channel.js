import request from '@/utils/request'
import Config from '@/config'

export function create(data) {
  return request({
    url: `${Config.apiPrefix}/channel`,
    method: 'post',
    data
  })
}

export function index() {
  return request({
    url: `${Config.apiPrefix}/channel`,
    method: 'get'
  })
}

export function update(data) {
  return request({
    url: `${Config.apiPrefix}/channel/${data.channel_id}`,
    method: 'put',
    data
  })
}

export function del(id) {
  return request({
    url: `${Config.apiPrefix}/channel/${id}`,
    method: 'delete'
  })
}
