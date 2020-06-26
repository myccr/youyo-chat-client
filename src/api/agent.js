import request from '../utils/request'

/**
 * 获取在线坐席
 * @param orgi
 * @param webid
 */
export function getAgentLis({ agentId, visitorId }) {
  return request({
    url: '/msg/visitor/getConversationAgent',
    method: 'get',
    params: { agentId, visitorId }
  })
}
