<template>
  <el-dropdown id="guide-lang" class="international" trigger="click" @command="handSetLanguage">
    <div>
      <el-tooltip placement="bottom-start" :content="$t('msg.navBar.lang')" :effect="effect">
        <div>
          <svg-icon icon="language"></svg-icon>
        </div>
      </el-tooltip>
    </div>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language === 'zh'" command="zh">中文</el-dropdown-item>
        <el-dropdown-item :disabled="language === 'en'" command="en">English</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'

defineProps({
  effect: {
    type: String,
    default: 'dark',
    validator (value) {
      return ['dark', 'light'].indexOf(value) !== -1
    }
  }
})

const store = useStore()
const language = computed(() => store.getters.language)
// 切换语言
const i18n = useI18n()
const handSetLanguage = lang => {
  // 切换 i18n 的 locale
  i18n.locale.value = lang
  // 修改vuex中的language
  store.commit('app/setLanguage', lang)
  // 提示
  ElMessage.success(i18n.t('msg.toast.switchLangSuccess'))
}
</script>

<style scoped lang="scss">

</style>
