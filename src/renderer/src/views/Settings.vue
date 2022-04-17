<script setup lang="tsx">
import type { MenuOption } from 'naive-ui';
import { RouterLink, useRoute } from 'vue-router';
import locale from '../language/zh_CN.yaml';
// 不能删
import { h, Fragment } from 'vue';

const route = useRoute();

const menuOptions: MenuOption[] = Object.entries(locale.settings.routes)
  .map(([path, name]) => ({
    label: () => (
      <RouterLink to={path}>
        {() => name}
      </RouterLink>
    ),
    key: path,
  }));
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
