<template>
  <div class="hamburger-container" @click="toggleClick">
    <svg-icon :icon="icon" class="hamburger"></svg-icon>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const icon = computed(() => {
  return store.getters.sidebarOpened ? 'hamburger-opened' : 'hamburger-closed'
})
console.log(icon.value)

const toggleClick = () => {
  store.commit('app/triggerSidebarOpened')
}
</script>

<style scoped lang="scss">
.hamburger-container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 16px;
  :deep(.svg-icon){
    width: 20px;
    height: 20px;
  }
  .hamburger{
    display: inline-block;
    vertical-align: center;
  }
}
</style>
