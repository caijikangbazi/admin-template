<template>
  <div id="guide-hamburger" class="hamburger-container" @click="toggleClick">
    <svg-icon :icon="icon" class="hamburger"></svg-icon>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { MENU_SHOW } from '@/constant'
import { useStore } from 'vuex'

const store = useStore()
const icon = computed(() => {
  return store.getters.sidebarOpened ? 'hamburger-opened' : 'hamburger-closed'
})

const toggleClick = () => {
  store.commit('app/triggerSidebarOpened')
}

const screenW = ref(document.body.clientWidth)

watch(
  screenW,
  val => {
    if (val < MENU_SHOW && store.getters.sidebarOpened) {
      toggleClick()
    }
    if (val >= MENU_SHOW && !store.getters.sidebarOpened) {
      toggleClick()
    }
  },
  { immediate: true }
)
window.onresize = () => {
  screenW.value = document.body.clientWidth
}
</script>

<style scoped lang="scss">
.hamburger-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 16px;

  :deep(.svg-icon) {
    width: 20px;
    height: 20px;
  }

  .hamburger {
    display: inline-block;
    vertical-align: center;
  }
}
</style>
