<script setup lang="tsx">
import { RouterLink, useRoute, useRouter } from 'vue-router';
import historyHomeworkList from '../stores/homeworkHistoryList';
import { MenuOption, NTime } from 'naive-ui';
import { h, Fragment } from 'vue';

const route = useRoute();

const menuOptions: MenuOption[] = historyHomeworkList.value.sort()
  .map(date => ({
    label: () => (
      <RouterLink to={`/homeworkHistory/${date}`}>
        {() => <NTime time={date} format="M 月 d 日"/>}
      </RouterLink>
    ),
    key: date.toString(),
  })).reverse();

</script>

<template>
  <n-layout>
    <n-layout-header style="padding: 10px 0 0 10px;">
      <n-button @click="$router.push('/homeworkEdit')">
        返回
      </n-button>
    </n-layout-header>
    <n-layout has-sider>
      <n-layout-sider content-style="padding: 10px 5px;">
        <n-menu :options="menuOptions" :value="route.params.date"/>
      </n-layout-sider>
      <n-layout-content content-style="padding: 24px;">
        <!-- 加这个 key 可以让路由切换的时候组件完整刷新而不只是重新渲染 -->
        <router-view :key="route.params.date"/>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>
