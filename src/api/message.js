import request from '../utils/request'

/**
 * 设置超时
 * @param timeout
 * @returns {AxiosPromise}
 */
export function getMsg(sessionId, timeout = 20000) {
  return request({
    url: '/msg/visitor/getMessage',
    method: 'get',
    params: { sessionId, timestamp: new Date().getTime() },
    timeout
  })
}

/**
 * 发送消息
 */
export function sendTextMsg(data) {
  return request({
    url: '/msg/visitor/sendTextMsg',
    method: 'post',
    data
  })
}

/**
 *
 * @param visitorId 访客ID
 * @param count 数量
 */
export function getMsgList({ visitorId, agentId }) {
  return request({
    url: '/msg/visitor/getMessageList',
    method: 'get',
    params: { visitorId, agentId }
  })
}

