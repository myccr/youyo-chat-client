/**
 * 判断浏览器类型
 * @returns {string}
 */
export function myBrowser() {
  const userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
  const isOpera = userAgent.indexOf('Opera') > -1 // 判断是否Opera浏览器
  const isIE = userAgent.indexOf('compatible') > -1 &&
        userAgent.indexOf('MSIE') > -1 && !isOpera // 判断是否IE浏览器
  const isEdge = userAgent.indexOf('Edge') > -1 // 判断是否IE的Edge浏览器
  const isFF = userAgent.indexOf('Firefox') > -1 // 判断是否Firefox浏览器
  const isSafari = userAgent.indexOf('Safari') > -1 &&
        userAgent.indexOf('Chrome') === -1 // 判断是否Safari浏览器
  const isChrome = userAgent.indexOf('Chrome') > -1 &&
        userAgent.indexOf('Safari') > -1 // 判断Chrome浏览器

  if (isIE) {
    const reIE = new RegExp('MSIE (\\d+\\.\\d+);')
    reIE.test(userAgent)
    const fIEVersion = parseFloat(RegExp['$1'])
    if (fIEVersion === 7) {
      return 'IE7'
    } else if (fIEVersion === 8) {
      return 'IE8'
    } else if (fIEVersion === 9) {
      return 'IE9'
    } else if (fIEVersion === 10) {
      return 'IE10'
    } else if (fIEVersion === 11) {
      return 'IE11'
    }
    // IE版本过低
    return 'IE'
  }
  if (isOpera) {
    return 'Opera'
  }
  if (isEdge) {
    return 'Edge'
  }
  if (isFF) {
    return 'FF'
  }
  if (isSafari) {
    return 'Safari'
  }
  if (isChrome) {
    return 'Chrome'
  }
}

// 获取客户端操作系统类型
export function getOSInfo() {
  const _pf = navigator.platform
  const appVer = navigator.userAgent
  let _bit = '64位'
  if (_pf === 'Win32' || _pf === 'Windows') {
    if (!(appVer.indexOf('WOW64') > -1)) {
      _bit = '32位'
    }
    if (appVer.indexOf('Windows NT 6.0') > -1 || appVer.indexOf('Windows Vista') > -1) {
      if (_bit === '64位' || appVer.indexOf('Windows Vista') > -1) {
        return 'Windows_vista ' + _bit
      } else {
        return 'Unknow1'
      }
    } else if (appVer.indexOf('Windows NT 6.1') > -1 || appVer.indexOf('Windows 7') > -1) {
      if (_bit === '32位' || appVer.indexOf('Windows 7') > -1) {
        return 'Windows_7 ' + _bit
      } else {
        return 'Unknow'
      }
    } else {
      try {
        const _winName = ['2000', 'XP', '2003']
        const _ntNum = appVer.match(/Windows NT 5.\d/i).toString()
        return 'Windows_' + _winName[_ntNum.replace(/Windows NT 5.(\d)/i, '$1')] + ' ' + _bit
      } catch (e) {
        return 'Windows'
      }
    }
  } else if (_pf === 'Mac68K' || _pf === 'MacPPC' || _pf === 'Macintosh') {
    return 'Mac'
  } else if (_pf === 'X11') {
    return 'Unix'
  } else if (String(_pf).indexOf('Linux') > -1) {
    return 'Linux'
  } else {
    return 'Unknow'
  }
}
