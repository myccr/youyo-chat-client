<template>
  <div id="app">
    <!--<youyo-chat
      :visitor-base="clientInfo"
      :visible-org="true" />-->

    <el-popover
      :visible-arrow="false"
      v-model="visible"
      placement="top"
      width="400"
      transition="el-zoom-in-bottom"
      popper-class="chat"
      trigger="manual">
      <youyo-chat
        :visitor-base="clientInfo"
        :show-tool="true"
        height="calc(60vh - 54px)"
        @receiveMessage="handleReceiveMessage"
        @handleZoomOut="visible = false"
      />
      <el-button
        slot="reference"
        style="position: fixed; bottom: 1px; right: 1px"
        icon="el-icon-chat-dot-round"
        @click="visible = !visible">
        在线客服
      </el-button>
    </el-popover>

  </div>
</template>

<script>
import { getOSInfo, myBrowser } from '../utils/common'
export default {
  name: 'MiniWindow',
  data() {
    return {
      notReadCount: 2,
      visible: false,
      clientInfo: {
        referer: document.referrer,
        url: window.location.href,
        hostname: window.location.hostname,
        title: document.title,
        browser: myBrowser(),
        osType: getOSInfo()
      }
    }
  },
  methods: {
    handleReceiveMessage() {
      this.visible = true
    }
  }
}
</script>

<style lang="scss">
  .chat{
    padding: 0px 0px 0px 0px;
  }
</style>
