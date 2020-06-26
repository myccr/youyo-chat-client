<template>
  <div id="message-send-box-wrapper" :style="focus ? {'backgroundColor': 'white'} : {}">
    <!--工具栏-->
    <div class="send-header-bar">
      <i class="el-icon-picture-outline" title="发图片" />
      <i class="el-icon-files" title="发文件" />
    </div>
    <!--消息输入框-->
    <div class="bottom">
      <textarea
        ref="text-input"
        v-model="messageContent"
        :disabled="isDisabled"
        rows="4"
        resize="false"
        class="text-input"
        @focus="focus = true"
        @blur="focus = false"
        @keydown.enter.exact.prevent="handleEnter"
        @keyup.ctrl.enter.prevent.exact="handleLine"
        @keydown.up.stop="handleUp"
        @keydown.down.stop="handleDown"
      />
      <el-tooltip
        class="item"
        effect="dark"
        content="按Enter发送消息，Ctrl+Enter换行"
        placement="left-start"
      >
        <div :style="isDisabled ? 'pointer-events: none':'' " class="btn-send">
          <i class="el-icon-s-promotion" @click="sendTextMessage" />
        </div>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
// 消息输入框

export default {
  name: 'MessageSendBox',
  props: {
    visitorInfo: {
      type: Object,
      default() {
        return {}
      }
    },
    currentConversation: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      messageContent: '',
      // 是否聚焦
      focus: false,
      // 禁用消息
      isDisabled: typeof this.toUserId === 'undefined'
    }
  },
  computed: {
    toUserId() {
      return this.currentConversation.id
    },
    name() {
      return this.visitorInfo.name
    },
    visitorId() {
      return this.visitorInfo.id
    },
    sessionId() {
      return this.visitorInfo.sessionId
    }
  },
  watch: {
    toUserId(newVal) {
      this.isDisabled = typeof newVal === 'undefined'
    }
  },
  created() {
    console.log('this.toUserId', this.currentConversation)
  },
  methods: {
    // Enter 键监听
    handleEnter() {
      this.sendTextMessage()
    },
    // 输入框换行
    handleLine() {
      this.messageContent += '\n'
    },
    handleUp() {

    },
    handleDown() {

    },
    // 发送消息
    sendTextMessage() {
      if (
        this.messageContent === '' ||
        this.messageContent.trim().length === 0
      ) {
        this.$notify({
          message: '不能发送空消息哦！',
          type: 'info',
          duration: 1000
        })
        return
      }
      // 基础消息模板 默认发送
      // ID 和 name 通过 token来识别
      const sendData = {
        msgContent: this.messageContent,
        toMsgId: this.toUserId,
        id: this.visitorId,
        name: this.name,
        sessionId: this.sessionId,
        webSiteId: this.$authInfo.webId,
        status: 'unSend',
        type: 0,
        isNew: 1,
        sendMsgTime: new Date().getTime()
      }
      this.$emit('sendTextMessage', sendData)
      this.messageContent = ''
    }
  }

}
</script>

<style lang="scss" scoped>
  @import '../../../styles/conversation.scss';
  #message-send-box-wrapper {
    box-sizing: border-box;
    overflow: hidden;
    padding: 3px 20px 20px 20px;
    .send-header-bar {
      box-sizing: border-box;
      padding: 3px 0 0 0;
      i {
        cursor: pointer;
        font-size: 24px;
        color: gray;
        margin: 0 12px 0 0;
        &:hover{
          color: $black;
        }
      }
    }
    .bottom {
      padding-top: 10px;
      position: relative;

      .text-input {
        font-size: 16px;
        width: 100%;
        box-sizing: box-sizing;
        border: none;
        outline: none;
        background-color: transparent;
      }

      .btn-send {
        cursor: pointer;
        position: absolute;
        color: $primary;
        font-size: 30px;
        right: 0;
        bottom: -5px;
        padding: 6px 6px 4px 4px;
        border-radius: 50%;
      }
    }
  }
  textarea {
    resize: none;
  }
</style>
