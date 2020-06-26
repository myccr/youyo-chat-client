<template>
  <div :style="{ height:height }" class="current-conversation-wrapper">
    <div class="current-conversation" @scroll="onScroll">
      <!--TODO 头部-->
      <!--<div class="header">
        <div class="name">{{ name }}</div>
      </div>-->
      <!--对话内容-->
      <div class="content">
        <div ref="message-list" class="message-list" @scroll="onScroll">
          <message-item v-for="message in currentMessageList" :key="message.key" :message="message" :visitor-id="visitorInfo.id"/>
        </div>
        <div
          v-show="isShowScrollButtomTips"
          class="newMessageTips"
          @click="scrollMessageListToButtom"
        >回到最新位置
        </div>
      </div>
      <!--底部-->
      <div class="footer">
        <message-send-box
          :visitor-info="visitorInfo"
          :current-conversation="currentConversation"
          @sendTextMessage="HandlerSendMessage" />
      </div>
    </div>
  </div>
</template>
<script>
import MessageSendBox from './MessageSendBox'
import MessageItem from './MessageItem'
import youImCore from '../../../im'

export default {
  name: 'CurrentConversation',
  components: {
    MessageSendBox,
    MessageItem
  },
  props: {
    currentConversation: {
      type: Object,
      required: true,
      default: function() {
        return {}
      }
    },
    currentMessageList: {
      type: Array,
      default: function() {
        return []
      }
    },
    visitorInfo: {
      type: Object,
      required: true,
      default: function() {
        return {}
      }
    },
    height: {
      type: String,
      default: 'calc(100vh - 54px)'
    }
  },
  data() {
    return {
      // 显示对话框
      preScrollHeight: 0,
      // 回到底部显示
      isShowScrollButtomTips: false
    }
  },
  computed: {
    name() {
      if (this.currentConversation) {
        return this.currentConversation.name || this.currentConversation.id
      }
      return ''
    }
  },
  watch: {},
  updated() {
    this.keepMessageListOnButtom()
  },
  methods: {
    // 监听滚动条
    onScroll({ target: { scrollTop }}) {
      const messageListNode = this.$refs['message-list']
      if (!messageListNode) {
        return
      }
      if (this.preScrollHeight - messageListNode.clientHeight - scrollTop < 10) {
        this.isShowScrollButtomTips = false
      }
    },
    HandlerSendMessage(val) {
      const msgStatus = {
        sendMsgTime: val.sendMsgTime,
        status: ''
      }
      this.$emit('sendMessage', val)
      youImCore.sendMsg(val).then(resp => {
        console.log('发送成功', resp)
        this.$emit('sendSuccess', msgStatus)
      }).catch(e => {
        msgStatus.status = 'fail'
        this.$emit('sendFail', msgStatus)
      })
    },
    // 如果滚到底部就保持在底部，否则提示是否要滚到底部
    keepMessageListOnButtom() {
      const messageListNode = this.$refs['message-list']
      if (!messageListNode) {
        return
      }
      // 距离底部20px内强制滚到底部,否则提示有新消息
      if (this.preScrollHeight - messageListNode.clientHeight - messageListNode.scrollTop < 10) {
        this.$nextTick(() => {
          messageListNode.scrollTop = messageListNode.scrollHeight
        })
        this.isShowScrollButtomTips = false
      } else {
        this.isShowScrollButtomTips = true
      }
      this.preScrollHeight = messageListNode.scrollHeight
    },
    scrollMessageListToButtom() {
      this.$nextTick(() => {
        const messageListNode = this.$refs['message-list']
        if (!messageListNode) {
          return
        }
        messageListNode.scrollTop = messageListNode.scrollHeight
        this.preScrollHeight = messageListNode.scrollHeight
        this.isShowScrollButtomTips = false
      })
    },
    showMore() {
      this.showConversationProfile = !this.showConversationProfile
    },
    onImageLoaded() {
      this.keepMessageListOnButtom()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../styles/conversation.scss';
    /* 当前会话的骨架屏 */
    .current-conversation-wrapper {
        //height: $height;
        background-color: $background-light;
        color: $base;
        display: flex;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

        .current-conversation {
            display: flex;
            flex-direction: column;
            width: 100%;
            //height: $height;

            .header {
                border-bottom: 1px solid $border-base;
                height: 50px;
                position: relative;
            }

            .content {
                display: flex;
                flex: 1;
                flex-direction: column;
                height: 100%;
                overflow: hidden;
                position: relative;

                .message-list {
                    width: 100%;
                    box-sizing: border-box;
                    overflow-y: scroll;
                    padding: 0 20px;
                }

                .newMessageTips {
                    position: absolute;
                    cursor: pointer;
                    padding: 5px;
                    width: 120px;
                    margin: auto;
                    left: 0;
                    right: 0;
                    bottom: 5px;
                    font-size: 12px;
                    text-align: center;
                    border-radius: 10px;
                    border: $border-light 1px solid;
                    background-color: $white;
                    color: $primary;
                }
            }

            .header {
                .name {
                    padding: 0 20px;
                    color: $base;
                    font-size: 18px;
                    line-height: 50px;
                    text-shadow: $font-dark 0 0 0.1em;
                }
            }

            .footer {
                border-top: 1px solid $border-base;
            }
        }
    }

    /* 设置滚动条的样式 */
    ::-webkit-scrollbar {
        width: 5px;
        height: 3px;
    }

    /* 滚动槽 */
    ::-webkit-scrollbar-track {
        border-radius: 13px;
    }

    /* 滚动条滑块 */
    ::-webkit-scrollbar-thumb {
        border-radius: 13px;
        background: rgba(0, 0, 0, 0.1);
    }
</style>
