<template>
  <div class="message-wrapper">
    <!--对话类型-->
    <div
      :class="messagePosition"
      class="c2c-layout"
    >
      <!--头像-->
      <div v-if="showAvatar" class="col-1">
        <!--TODO 头像 -->
        <span />
      </div>
      <!--消息主体-->
      <div class="col-2">
        <div class="content-wrapper">
          <message-status-icon v-if="isMine" :message="message" />
          <!-- FIXME 消息类型 目前仅支持文本-->
          <!--v-if="message.type === 0"-->
          <text-element
            :is-mine="isMine"
            :payload="message.msgContent"
            :message="message"
          />
        </div>
        <message-footer v-if="showMessageHeader" :message="message" />
      </div>
    </div>
  </div>
</template>
<script>
import TextElement from './TextElement'
import MessageFooter from './MessageFooter'
import MessageStatusIcon from './MessageStatusIcon'
export default {
  name: 'MessageItem',
  components: {
    TextElement,
    MessageStatusIcon,
    MessageFooter
  },
  props: {
    message: {
      type: Object,
      required: true
    },
    visitorId: {
      type: String,
      default: '',
      required: true
    }
  },
  data() {
    return {
      // 显示头像？
      showAvatar: false,
      showMessageHeader: true
    }
  },
  computed: {
    messagePosition() {
      // TODO 消息类型位置
      /* if (this.message.type === 0) {
        return 'position-center'
      }*/
      // 是自己
      if (this.isMine) {
        return 'position-right'
      } else {
        return 'position-left'
      }
    },
    // FIXME 暂时使用发送人ID 来判断是否自己发出
    isMine() {
      return this.message.id === this.visitorId
    }
  }
}
</script>

<style lang="scss" scoped>
  .message-wrapper {
    margin: 20px 0;

    .content-wrapper {
      display: flex;
      align-items: center;
    }
  }
  .group-layout, .c2c-layout, .system-layout {
    display: flex;

    .col-1 {
      .avatar {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
      }
    }

    .group-member-avatar {
      cursor: pointer;
    }

    .col-2 {
      display: flex;
      flex-direction: column;
      // max-width 50% // 此设置可以自适应宽度，目前由bubble限制
    }

    .col-3 {
      width: 30px;
    }

    &.position-left {
      .col-2 {
        align-items: flex-start;
      }
    }

    &.position-right {
      flex-direction: row-reverse;

      .col-2 {
        align-items: flex-end;
      }
    }

    &.position-center {
      justify-content: center;
    }
  }

  .c2c-layout {
    .col-2 {
      .base {
        margin-top: 3px;
      }
    }
  }

  .group-layout {
    .col-2 {
      .chat-bubble {
        margin-top: 5px;
      }
    }
  }
</style>
