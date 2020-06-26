<template>
  <message-bubble :message="message" :is-mine="isMine" >
    <template v-for="(item, index) in contentList">
      <span v-if="item.name === 'text'" :key="index">{{ item.text }}</span>
      <img v-else-if="item.name === 'img'" :key="index" :src="item.src" width="20px" height="20px">
    </template>
  </message-bubble>
</template>

<script>
import MessageBubble from './MessageBubble'
import { decodeText } from '../../../utils/decodeText'
export default {
  name: 'TextElement',
  components: {
    MessageBubble
  },
  props: {
    payload: {
      type: String,
      required: true
    },
    message: {
      type: Object,
      required: true
    },
    isMine: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    contentList() {
      return decodeText(this.payload)
    }
  }
}
</script>

<style scoped>

</style>
