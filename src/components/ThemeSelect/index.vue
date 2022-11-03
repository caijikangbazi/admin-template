<template>
  <el-dropdown class="theme" v-bind="$attrs" trigger="click" @command="handSetTheme">
    <div>
      <el-tooltip placement="bottom-start" :content="$t('msg.navBar.themeChange')" effect="dark">
        <div>
          <svg-icon icon="change-theme"></svg-icon>
        </div>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="color">{{ $t('msg.theme.themeColorChange') }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

  <!-- 弹出层 -->
  <div>
    <select-color v-model="selectColorVisible" />
  </div>
</template>

<script setup>
import SelectColor from './components/SelectColor'
import { ref } from 'vue'

// dialog
const selectColorVisible = ref(false)

const handSetTheme = command => {
  selectColorVisible.value = true
}

</script>

<style scoped lang="scss">

</style>
