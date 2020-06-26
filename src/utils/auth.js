import Cookies from 'js-cookie'

const TOKEN_PREFIX = 'visit-id-'

export function getVisitorId(webId) {
  return Cookies.get(TOKEN_PREFIX + webId)
}

export function setVisitorId(webId, token) {
  // 设置过期时间为10年
  const expiresTime = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 365 * 10)
  return Cookies.set(TOKEN_PREFIX + webId, token, {
    expires: expiresTime
  })
}

export function removeVisitorId(webId) {
  return Cookies.remove(TOKEN_PREFIX + webId)
}
