import request from '../utils/request'

/**
 * 保存访客信息
 * @param visitor
 * @returns {AxiosPromise}
 */
export function visitorAuth(visitor) {
  return request({
    url: '/msg/visitor/visitorAuth',
    method: 'post',
    data: visitor
  })
}
