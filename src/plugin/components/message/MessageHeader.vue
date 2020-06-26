<template>
  <div :class="[ isMine ? 'right' : 'left']" class="base">
    <div class="name text-ellipsis">{{ from }}</div>
    <div class="date">{{ date }}</div>
  </div>
</template>

<script>
import { getFullDate } from '../../../utils/date'
export default {
  name: 'MessageHeader',
  props: {
    message: {
      type: Object,
      required: true
    },
    currentConversation: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  computed: {
    isMine() {
      return true
    },
    date() {
      return getFullDate(new Date(this.message.sendMsgTime * 1000))
    },
    from() {
      // 没有名称使用 id 显示
      return (
        this.currentConversation.name ||
        this.currentConversation.id
      )
    }

  }
}
</script>

<style lang="scss" scoped>
  @import '../../../styles/conversation.scss';
  .right {
    display: flex;
    flex-direction: row-reverse;
  }

  .left {
    display: flex;
    flex-direction: row;
  }

  .base {
    color: $secondary;
    font-size: 12px;
  }
</style>
