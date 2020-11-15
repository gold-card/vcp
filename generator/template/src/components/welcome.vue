<template>
  <div class="welcome">
    <h4>{{ paramFromParent }}</h4>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  props: {
    paramFromParent: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="less" scoped></style>
