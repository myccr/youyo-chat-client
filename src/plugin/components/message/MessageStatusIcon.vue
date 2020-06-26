<template>
  <div
    :class="messageIconClass"
    style="width:16px;height:16px;"
    @click="handleIconClick"
  >{{ messageIconClass==='message-send-fail'? '!':'' }}</div>
</template>

<script>
export default {
  name: 'MessageStatusIcon',
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  computed: {
    messageIconClass() {
      switch (this.message.status) {
        // 发送中
        case 'unSend':
          return 'el-icon-loading'
        // 发送失败
        case 'fail':
          return 'message-send-fail'
        // 发送成功
        default:
          return ''
      }
    }
  },
  methods: {
    // 重新发送
    handleIconClick() {

    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../styles/conversation.scss';
  .message-send-fail {
    margin-right: 8px;
    background-color: #f35f5f;
    color: $white;
    border-radius: 50%;
    text-align: center;
    line-height: 16px;
    cursor: pointer;
  }
</style>
