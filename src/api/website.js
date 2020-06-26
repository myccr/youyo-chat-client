import request from '../utils/request'

/**
 * 获取坐席列表
 */
export function getAgentLis() {

}

/**
 * 获取坐席信息
 */
export function getAgentInfo() {

}

/**
 * 认证web站点
 */
export function authWebSite({ webId, orgi, webUrl }) {
  return request({
    url: '/msg/visitor/webClientAuth',
    method: 'get',
    params: { webId, orgi, webUrl }
  })
}

