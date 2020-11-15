<template>
  <div class="hello">
    <h3>this is hello page.</h3>
    <Welcome :paramFromParent="parentName"></Welcome>
  </div>
</template>

<script>
import Welcome from '@/components/welcome'
export default {
  name: 'Hello',
  components: { Welcome },
  data() {
    return {
      parentName: 'Hello',
    }
  },
}
</script>

<style lang="less" scoped></style>
