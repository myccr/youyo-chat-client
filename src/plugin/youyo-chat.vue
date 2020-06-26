<template>
  <div id="conversation-wrapper">
    <div class="header">
      <dialog-header
        :current-conversation="currentConversation"
        :show-tool="showTool"
        @zoomOut="handleZoomOut"
      />
    </div>
    <el-container>
      <el-main>
        <current-conversation
          :visitor-info="visitorInfo"
          :current-conversation="currentConversation"
          :current-message-list="currentMessageList"
          :height="height"
          @sendSuccess="updateMessageStatus"
          @sendFail="updateMessageStatus"
          @sendMessage="handleSendMessage"/>
      </el-main>
      <el-aside v-if="visibleOrg" :style="{ height:height }">
        组织信息
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import DialogHeader from './components/DialogHeader'
import CurrentConversation from './components/message/index'
import { getVisitorId, setVisitorId } from '../utils/auth'
import { visitorAuth } from '../api/visitor'
import { getAgentLis } from '../api/agent'
import { getMsgList } from '../api/message'

import youImCore from '../im'

export default {
  name: 'YouyoChat',
  components: {
    DialogHeader,
    CurrentConversation
  },
  props: {
    visitorBase: {
      type: Object,
      required: false,
      default() {
        return {}
      }
    },
    visibleOrg: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: 'calc(100vh - 54px)'
    },
    showTool: {
      type: Boolean,
      default: false
    },
    webId: {
      type: String,
      required: false,
      default() {
        if (this.$authInfo.webId) {
          return this.$authInfo.webId
        }
        return ''
      }
    },
    orgi: {
      type: String,
      required: false,
      default() {
        if (this.$authInfo.orgi) {
          return this.$authInfo.orgi
        }
        return ''
      }
    }
  },
  data() {
    return {
      currentConversation: {}, // 当前对话
      currentMessageList: [], // 消息列表
      webUrl: '', // 当前URL
      visitorId: getVisitorId(this.webId), // 访客ID
      sessionId: '',
      visitorInfo: {}, // 访客信息
      name: '' // 访客名称
    }
  },
  mounted() {
    this.initAuth()
    // 将变量注册为全局变量
    if (!this.$authInfo.webId && !this.$authInfo.orgi) {
      this.$authInfo.webId = this.webId
      this.$authInfo.orgi = this.orgi
    }
  },
  methods: {
    initAuth() {
      if (!this.webId || !this.orgi) {
        this.$message({
          message: '缺少webId | orgi  初始化失败',
          type: 'error',
          duration: 10000
        })
        return
      }
      const visitorInfo = {
        id: this.visitorId,
        orgi: this.orgi,
        webSiteId: this.webId,
        // 客户端数据分离
        ...this.visitorBase
      }
      visitorAuth(visitorInfo).then(resp => {
        const { data } = resp
        this.visitorInfo = data
        // 设置站点cookie 防止冲突
        setVisitorId(this.webId, data.id)
        this.visitorId = data.id
        this.sessionId = data.sessionId
        this.initImCore()
      }).catch(e => {
        this.$message({
          message: `认证失败 ${e}`
        })
      })
    },
    initImCore() {
      const initParams = {
        option: {
          getMsgCallback: this.onReceiveMessage,
          initCompleteCallback: this.initComplete
        },
        sessionId: this.sessionId
      }
      youImCore.init(initParams)
    },
    initComplete() {
      // 获取在线客服
      const data = {
        agentId: this.visitorInfo.lastConversationId,
        visitorId: this.visitorInfo.id,
        sessionId: this.sessionId
      }
      getAgentLis(data).then(resp => {
        if (resp.data) {
          this.currentConversation = resp.data
          this.getMessageList()
        } else {
          this.$message({
            message: '没有在线客服',
            type: 'warning',
            duration: 20000
          })
        }
      })
    },
    // 获取消息列表
    getMessageList() {
      const data = { visitorId: this.visitorInfo.id, agentId: this.currentConversation.id }
      getMsgList(data).then(resp => {
        if (resp.data) {
          const { data } = resp
          // 更新当前消息列表，从头部插入
          this.pushCurrentMessageList(data)
        } else {
          this.currentMessageList = []
        }
      })
    },
    handleZoomOut() {
      this.$emit('handleZoomOut')
    },
    handleSendMessage(val) {
      console.log('发送消息：', val)
      this.pushCurrentMessageList(val)
    },
    // 收到消息
    onReceiveMessage(msg) {
      console.log(`收到来自 ${msg.id} 的消息`, msg)
      this.currentConversation = msg
      this.pushCurrentMessageList(msg)
      this.$emit('receiveMessage', msg)
    },
    /**
     * 根据消息发送时间来修改消息状态
     * FIXME 需要为每个消息设置ID 唯一标识
     */
    updateMessageStatus(msg) {
      const index = this.currentMessageList.findIndex(v => {
        return v.sendMsgTime === msg.sendMsgTime
      })
      if (index > -1) {
        this.currentMessageList[index].status = msg.status
      }
    },
    pushCurrentMessageList(data) {
      // 还没当前会话，则跳过
      if (!this.currentConversation.id) {
        return
      }
      if (Array.isArray(data)) {
        this.currentMessageList = [...this.currentMessageList, ...data]
      } else {
        this.currentMessageList = [...this.currentMessageList, data]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    @import '../styles/conversation.scss';

    #conversation-wrapper {
      .header {
          background-color: #B3C0D1;
          color: #333;
      }
    }

    .el-container {
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        padding: 0px 0px 0px 0px;
        background-color: #E9EEF3;
        color: #333;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        width: 20%;
        margin: 0px 0px 0px 0px;
    }
</style>
