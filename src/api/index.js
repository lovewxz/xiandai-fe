import request from '@/utils/request'
import Config from '@/config'

export function update(data) {
  return request({
    url: `${Config.apiPrefix}/index/10`,
    method: 'put',
    data
  })
}

export function edit() {
  return request({
    url: `${Config.apiPrefix}/index/10/edit`,
    method: 'get'
  })
}
