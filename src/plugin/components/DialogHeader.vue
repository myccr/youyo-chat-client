<template>
  <div class="dialog-header-wrapper">
    <el-row>
      <el-col :span="1">
        <div class="avatar">
          <el-avatar
            size="medium"
            fit="fit"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="info">
          <div class="name">
            {{ agentName }}
          </div>
          <div class="org-name">
            {{ orgName }}
          </div>
        </div>
      </el-col>
      <el-col :span="18">
        <div v-if="showTool" class="tool">
          <i class="el-icon-full-screen" @click="handleOpenFull"/>
          <i class="el-icon-minus" @click="handleZoomOut" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'DialogHeader',
  props: {
    currentConversation: {
      type: Object,
      default: function() {
        return {}
      }
    },
    showTool: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    agentName() {
      if (this.currentConversation.name) {
        return this.currentConversation.name
      }
      return '客服1'
    },
    orgName() {
      // FIXME 设置组织（公司）名称
      return 'YouYo KF'
    }
  },
  methods: {
    handleOpenFull() {
      // FIXME 固定逻辑，跳转至服务全屏，开放事件监听，扩展业务逻辑
      this.$emit('openFull')
    },
    handleZoomOut() {
      this.$emit('zoomOut')
    }
  }
}
</script>

<style lang="scss" scoped>
    .dialog-header-wrapper {
        height: 50px;
        text-shadow: #76828c 0 0 0.1em;
        .avatar {
            position: absolute;
            left: 10px;
            top: 6px;
        }

        .info {
            font-size: 0.9em;
            position: absolute;
            left: 53px;
            top: 9px;

            .org-name {
                top: 7px;
            }
        }
        .tool {
          cursor: pointer;
          position: absolute;
          right: 5px;
          font-size: 20px;
          transition: color .15s linear;
          i {
            margin-left: 5px;
            color: #000000;
            &:hover {
              color: #2d8cf0;
            }
          }
        }
    }
</style>
