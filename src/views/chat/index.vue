<template>
  <youyo-chat
    :show-tool="false"
    :visible-org="true"
    :web-id="this.$route.params.webId"
    :orgi="this.$route.params.orgi"/>
</template>

<script>
export default {
  name: 'Chat',
  mounted() {
  }
}
</script>

<style scoped>

</style>
