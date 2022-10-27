<template>
  <el-menu
    :collapse="!$store.getters.sidebarOpened"
    :uniqueOpened="true"
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
    :default-active="activeMenu"
    router
  >
    <sidebar-item v-for="item of routes" :key="item.path" :route="item"></sidebar-item>
  </el-menu>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { generateMenus, filterRouters } from '@/utils/route'
import SidebarItem from './SidebarItem'
import { computed } from 'vue'

const router = useRouter()
const routes = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateMenus(filterRoutes)
})

// 默认激活项
const route = useRoute()
const activeMenu = computed(() => {
  const { path } = route
  return path
})
</script>

<style scoped lang="scss">

</style>
