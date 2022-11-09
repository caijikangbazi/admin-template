<template>
  <div
    class="header-search"
    :class="{show:isShow}"
  >
    <div @click.stop="onShowClick" id="guide-search">
      <svg-icon class-name="search-icon" icon="search"></svg-icon>
    </div>

    <el-select
      v-model="search"
      ref="headerSearchSelectRef"
      class="header-search-select"
      filterable
      default-first-option
      remote
      :remote-method="querySearch"
      placeholder="search"
      @change="onSelectChange"
    >
      <el-option
        v-for="option in searchOptions"
        :key="option.item.path"
        :label="option.item.title.join('>')"
        :value="option.item" />
    </el-select>
  </div>
</template>

<script setup>
import { filterRouters } from '@/utils/route'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { generateRoutes } from '@/components/HeaderSearch/FuseData'
import Fuse from 'fuse.js'
import { watchSwitchLang } from '@/utils/i18n'

// 数据源
const router = useRouter()
let searchPool = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateRoutes(filterRoutes)
})

let fuse
const initFuse = searchPool => {
  fuse = new Fuse(searchPool, {
    // 是否按优先级进行排序
    shouldSort: true,
    // 匹配长度超过这个值的才会被认为是匹配的
    minMatchCharLength: 1,
    // 将被搜索的键列表。 这支持嵌套路径、加权搜索、在字符串和对象数组中搜索。
    // name：搜索的键
    // weight：对应的权重
    keys: [
      {
        name: 'title',
        weight: 0.7
      },
      {
        name: 'path',
        weight: 0.3
      }
    ]
  })
}
initFuse(searchPool.value)

const isShow = ref(false)
const search = ref('')

const onShowClick = () => {
  isShow.value = !isShow.value
}
const searchOptions = ref([])
const querySearch = (query) => {
  if (query !== '') {
    searchOptions.value = fuse.search(query)
  }
}

const onSelectChange = (val) => {
  router.push(val.path)
}

const headerSearchSelectRef = ref(null)

watch(isShow, value => {
  if (value) {
    headerSearchSelectRef.value.focus()
    document.body.addEventListener('click', onClose)
  } else {
    document.body.removeEventListener('click', onClose)
  }
})

// 关闭事件
const onClose = () => {
  headerSearchSelectRef.value.blur()
  search.value = ''
  isShow.value = false
  searchOptions.value = []
}

watchSwitchLang(() => {
  searchPool = computed(() => {
    const filterRoutes = filterRouters(router.getRoutes())
    return generateRoutes(filterRoutes)
  })
  initFuse(searchPool.value)
})

</script>

<style scoped lang="scss">
.header-search {
  font-size: 0 !important;
  justify-content: center;
  align-items: center;
  display: flex !important;

  :deep(.search-icon) {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }

  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    :deep(.el-input__inner) {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }

  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
