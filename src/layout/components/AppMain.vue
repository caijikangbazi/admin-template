<template>
  <div class="app-main">
    <!--  带有切换动画,并且具备组件缓存  -->
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <div class="app-main-container">
            <component :is="Component" :key="route.path" />
          </div>
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { isTags } from '@/utils/tags'
import { useStore } from 'vuex'
import { generateTitle, watchSwitchLang } from '@/utils/i18n'

/**
 * 生成title
 */
const getTitle = route => {
  let title = ''
  if (!route.meta) {
    const pathArr = route.path.split('/')
    title = pathArr[pathArr.length - 1]
  } else {
    title = generateTitle(route.meta.title)
  }
  return title
}

const route = useRoute()
const store = useStore()

watch(
  route,
  (to, from) => {
    if (!isTags(to.path)) return
    const {
      fullPath,
      meta,
      name,
      params,
      path,
      query
    } = to
    store.commit('app/addTagsViewList', {
      fullPath,
      meta,
      name,
      params,
      path,
      query,
      title: getTitle(to)
    })
  },
  {
    immediate: true
  })

watchSwitchLang(() => {
  store.getters.tagsViewList.forEach((route, index) => {
    store.commit('app/changTagsView', {
      index,
      tag: {
        ...route,
        title: getTitle(route)
      }
    })
  })
})

</script>

<style scoped lang="scss">
.app-main {
  min-height: calc(100vh - 50px - 43px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 104px 20px 20px;
  box-sizing: border-box;
}
</style>
