<template>
  <div class="">{{ $t('msg.profile.name') }}</div>

  <el-row class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </el-row>

  <el-pagination
    :page-size="100"
    layout="total, prev, pager, next"
    :total="1000"
  />
</template>

<script setup>
import {} from 'vue'
</script>

<style lang="scss" scoped></style>
