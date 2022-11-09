<template>
  <div class="navbar">
    <div class="left-menu">
      <hamburger class="hamburger-container" />
      <breadcrumb class="breadcrumb-container" />
    </div>
    <div class="right-menu">
      <guide class="right-menu-item hover-effect" />
      <header-search class="right-menu-item hover-effect"/>
      <!--   全屏   -->
      <screen-full class="right-menu-item hover-effect"/>
      <!--   主题   -->
      <theme-select class="right-menu-item hover-effect"/>
      <!--   国际化   -->
      <lang-select class="right-menu-item hover-effect"/>
      <!--   头像   -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar shape="square" :size="40" :src="$store.getters.userInfo.avatar"></el-avatar>
          <i class="el-icon-s-tools"></i>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>{{ $t('msg.navBar.home') }}</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided @click="logout">
              {{ $t('msg.navBar.logout') }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import Hamburger from '@/components/Hamburger'
import Breadcrumb from '@/components/Breadcrumb'
import ScreenFull from '@/components/Screenfull'
import LangSelect from '@/components/LangSelect'
import Guide from '@/components/Guide'
import ThemeSelect from '@/components/ThemeSelect'
import HeaderSearch from '@/components/HeaderSearch'
import { useStore } from 'vuex'

const store = useStore()
const logout = () => {
  store.dispatch('user/logout')
}
</script>

<style scoped lang="scss">
.navbar {
  display: flex;
  justify-content: space-between;
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .left-menu{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .hamburger-container {
      line-height: 46px;
      height: 100%;
      cursor: pointer;
      transition: background .5s;
    }

    .hamburger-container:hover {
      background: rgba(0, 0, 0, .2);
    }
    .breadcrumb-container{
      min-width: 120px;
    }
  }

  .right-menu {
    display: flex;
    align-items: center;
    padding-right: 16px;

    :deep(.right-menu-item) {
      display: inline-block;
      padding: 0 18px 0 0;
      font-size: 24px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
      }
    }

    :deep(.avatar-container) {
      cursor: pointer;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .el-avatar {
          background-color: transparent;
          margin-right: 12px;
        }
      }
    }
  }
}
</style>
