<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <!-- 面包屑的最后一项 -->
      <el-breadcrumb-item v-for="(item,index) of breadcrumbData" :key="item.path">
        <!--   不可点击项   -->
        <span class="no-redirect" v-if="index === breadcrumbData.length-1">{{ item.meta.title }}</span>
        <!--   可点击项   -->
        <span class="redirect" v-else @click="onLinkClick(item)">{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

// 生成数组数据
const breadcrumbData = ref([])
const getBreadcrumbData = () => {
  // 当前路由的标准化路由记录
  breadcrumbData.value = route.matched.filter(item => item.meta && item.meta.title)
}

// 监听路由变化
const route = useRoute()
watch(route, () => {
  getBreadcrumbData()
}, {
  immediate: true
})

const router = useRouter()
const onLinkClick = (item) => {
  router.push(item.path)
}

// 将来需要主题替换,hover 颜色 设置为 主色
const store = useStore()
const linkHoverColor = ref(store.getters.cssVar.menuBg)
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .redirect {
    color: #666;
    font-weight: 600;
  }

  .redirect:hover {
    color: v-bind(linkHoverColor);
    cursor: pointer;
  }

  :deep(.no-redirect) {
    color: #97a8be;
    cursor: text;
  }
}
</style>
