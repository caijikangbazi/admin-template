<template>
  <div class="app-wrapper" :class="[$store.getters.sidebarOpened?'openSidebar':'hideSidebar']">
    <!--  左侧menu  -->
    <sidebar class="sidebar-container" :style="{backgroundColor:$store.getters.cssVar.menuBg}" />
    <div class="main-container">
      <div class="fixed-header">
        <!--  顶部 navbar  -->
        <navbar />
        <tags-vies></tags-vies>
      </div>
      <app-main />
    </div>
    <!--  内容区  -->
  </div>
</template>

<script setup>
import Navbar from './components/Navbar'
import TagsVies from '@/components/TagsView'
import Sidebar from './components/Sidebar'
import AppMain from './components/AppMain'
import variables from '@/styles/variables.module.scss'

</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.module.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth });
  transition: width #{$sidebarDuration};
}

.hideSidebar .fixed-header {
  width: calc(100% - #{$hideSideBarWidth });;
}

.main-container{
  min-width: 650px;
}
</style>
