import { getMsg, sendTextMsg } from '../api/message'

const youImCore = {
  // 初始化
  init({ option, sessionId }) {
    // 消息轮询器
    if (this.isReady) {
      console.warn('重复初始化: ', this.isReady)
      return
    }
    if (!sessionId) {
      console.error('sessionId is null! initialization fail')
      return
    }
    this.sessionId = sessionId
    if (option) {
      if (typeof option !== 'object') {
        console.error('option 为对象')
        return
      }
      // 遍历注册回调
      Object.keys(option).forEach(v => {
        this.option[v] = option[v]
      })
    }
    // 执行消息轮询
    this.mesPoling()
    this.isReady = true
    this.option.initCompleteCallback()
  },
  sessionId: '',
  // 已准备
  isReady: false,
  // 已销毁
  isDestroy: false,
  option: {
    initCompleteCallback: function() {
      console.log('初始化完成回调')
    },
    sucCallback: function(val) {
      console.log('响应成功回调', val)
    },
    // 失败回调
    errorCallback: function(e) {
      console.error('失败回调', e)
    },
    // 收到消息回调
    getMsgCallback: function(val) {
      console.log('收到消息回调', val)
    },
    // 对方输入中消息提示
    getInputMsgCallback: function(val) {
      console.log('输入消息回调', val)
    },
    // 上线通知
    getOnlineMsgCallback: function(val) {
      console.log('上线通知', val)
    },
    // 发送消息成功
    // @deprecated
    sendMsgSucCallback: function(val) {
      console.log('发送消息成功', val)
    },
    // 发送消息失败回调
    // @deprecated
    sendMsgFailCallback: function(e) {
      console.error('发送消息失败回调', e)
    }
  },
  // 常量 消息类型状态码
  MSG_TYPE: {
    GET_MSG: 200, // 收到消息
    INPUT_ING: 936, // 对方输入中
    ONLINE: 322, // 上线
    END: 300, // 结束对话
    FAILED: 500 // 错误
  },
  // 消息轮询器
  mesPoling() {
    const self = this
    // 销毁停止
    if (this.isDestroy) {
      return
    }
    getMsg(this.sessionId).then(resp => {
      this.mesPoling()
      // 执行回调
      self.option.sucCallback(resp)
      // 收到消息回调
      if (resp) {
        const { msgType } = resp
        switch (msgType) {
          case self.MSG_TYPE.GET_MSG:
            self.option.getMsgCallback(resp)
            break
          case self.MSG_TYPE.INPUT_ING:
            self.option.getInputMsgCallback(resp)
            break
          case self.MSG_TYPE.ONLINE:
            self.option.getOnlineMsgCallback(resp)
            break
          default:
            console.log('收到心跳', resp)
            break
        }
      }
    }).catch(e => {
      self.option.errorCallback(e)
    })
  },
  // 发送消息
  sendMsg(data) {
    console.log('发送中')
    return sendTextMsg(data)
  },
  destroy() {
    this.isDestroy = true
    this.isReady = false
  }
}

export default youImCore
