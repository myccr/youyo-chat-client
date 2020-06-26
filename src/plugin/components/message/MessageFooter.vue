<template>
  <div :class="[ isMine ? 'right' : 'left']" class="base">
    <div class="date">{{ date }}</div>
  </div>
</template>

<script>
import { getFullDate } from '../../../utils/date'

export default {
  name: 'MessageFooter',
  props: {
    message: {
      type: Object,
      required: true
    },
    visitorId: {
      type: String,
      default: ''
    }
  },
  computed: {
    // 发送时间 时间搓 单位秒
    date() {
      return getFullDate(new Date(parseInt(this.message.sendMsgTime)))
    },
    isMine() {
      return this.message.id === this.visitorId
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../styles/conversation.scss';
  .right {
    display: flex;
    flex-direction: row-reverse;
    margin-right: 15px;
  }
  .left {
    display: flex;
    flex-direction: row;
    margin-left: 15px;
  }
  .base {
    color: $secondary;
    font-size: 12px;
  }
  .name {
    padding: 0 4px;
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
