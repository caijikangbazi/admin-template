<template>
  <div @click="ontoggle" >
    <div id="guide-full">
      <svg-icon :icon="isFullscreen?'exit-fullscreen':'fullscreen'"></svg-icon>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import screenFull from 'screenfull'

const isFullscreen = ref(false)

const ontoggle = () => {
  screenFull.toggle()
}

const change = () => {
  isFullscreen.value = screenFull.isFullscreen
}

onMounted(() => {
  screenFull.on('change', change)
})

onUnmounted(() => {
  screenFull.off('change', change)
})

</script>

<style scoped lang="scss">

</style>
