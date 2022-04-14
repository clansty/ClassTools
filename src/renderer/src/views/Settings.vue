<script setup lang="tsx">
import type { MenuOption } from 'naive-ui';
import { RouterLink, useRoute } from 'vue-router';
// 不能删
import { h, Fragment } from 'vue';

const route = useRoute();

const menuOptions: MenuOption[] = [
  {
    label: () => (
      <RouterLink to="/settings/basic">
        {() => '基础设置'}
      </RouterLink>
    ),
    key: 'basic',
  },
  {
    label: () => (
      <RouterLink to="/settings/lessons">
        {() => '课程配置'}
      </RouterLink>
    ),
    key: 'lessons',
  },
  {
    label: () => (
      <RouterLink to="/settings/schedule">
        {() => '课表编辑'}
      </RouterLink>
    ),
    key: 'schedule',
  },
];
</script>

<template>
  <n-layout has-sider>
    <n-layout-sider content-style="padding: 10px 5px;">
      <n-menu :options="menuOptions" :value="route.name"/>
    </n-layout-sider>
    <n-layout-content content-style="padding: 24px;">
      <router-view/>
    </n-layout-content>
  </n-layout>
</template>
