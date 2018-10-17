import request from '@/utils/request'
import Config from '@/config'

export function getUploadToken() {
  return request({
    url: `${Config.apiPrefix}/upload/token`,
    method: 'get'
  })
}
