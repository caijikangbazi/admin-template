<template>
  <div id="guide-tags" class="tags-view-container">
    <router-link
      class="tags-view-item"
      v-for="(tag,index) of $store.getters.tagsViewList"
      :key="tag.fullPath"
      :class="isActive(tag)?'active':''"
      :to="{path:tag.fullPath}"
      :style="{
        background:isActive(tag)?$store.getters.cssVar.menuBg:'',
        borderColor:isActive(tag)?$store.getters.cssVar.menuBg:''
      }"
      @contextmenu.prevent="openMenu($event,index)"
    >
      <span>{{ tag.title }}</span>
      <el-icon v-show="!isActive(tag)" class="el-icon-close" @click.prevent.stop="onCloseClick(index)">
        <Close />
      </el-icon>
    </router-link>

    <context-menu
      v-show="visible"
      :index="selectIndex"
      :style="{
        left:menuStyle.left,
        top:menuStyle.top
      }"
    />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { Close } from '@element-plus/icons-vue'
import ContextMenu from './ContextMenu'
import { ref, watch } from 'vue'
import { useStore } from 'vuex'

const route = useRoute()

const isActive = tag => {
  return tag.path === route.path
}
/**
 * 关闭 tag 的事件
 * @param index
 */
const store = useStore()
const onCloseClick = index => {
  store.commit('app/removeTagsView', {
    type: 'index',
    index: index
  })
}

/**
 * 鼠标右键
 * @type {Ref<UnwrapRef<boolean>>}
 */
const visible = ref(false)
const selectIndex = ref(0)
const menuStyle = ref({
  left: 0,
  top: 0
})
const openMenu = (e, index) => {
  const {
    x,
    y
  } = e
  selectIndex.value = index
  menuStyle.value.left = `${x}px`
  menuStyle.value.top = `${y}px`
  visible.value = true
}
const closeMenu = () => {
  visible.value = false
}
watch(visible, val => {
  if (val) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})
</script>

<style scoped lang="scss">
.tags-view-container {
  position: relative;
  display: flex;
  min-height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

  .tags-view-item {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
    min-width: 70px;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;

    &:first-of-type {
      margin-left: 15px;
    }

    &:last-of-type {
      margin-right: 15px;
    }

    &.active {
      color: #fff;

      &::before {
        content: '';
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 4px;
      }
    }

    // close 按钮
    .el-icon-close {
      width: 16px;
      height: 16px;
      line-height: 10px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;

      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }

      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }

  }
}
</style>
