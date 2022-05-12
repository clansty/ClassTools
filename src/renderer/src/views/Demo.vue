<script setup lang="ts">
import GithubIcon from '../assets/icons/Github.svg';
import { useTitle } from '@vueuse/core';

useTitle('ClassTools Demo');
</script>

<template>
  <n-layout>
    <n-layout-content content-style="padding: 24px; display: flex; flex-direction: column; align-items: center">
      <p style="font-size: 3em; font-weight: bold; margin-block-end: 0.9em">
        ClassTools
        <span style="font-weight: normal">Demo</span>
      </p>
      <a href="https://github.com/ClassToolsOfficial/ClassTools" target="_blank"
         style="display: flex; align-items: center; font-size: 1.5em; color: unset; margin-block-end: 3em">
        <GithubIcon/>
        GitHub
      </a>
      <n-space>
        <router-link to="/wallpaper" target="_blank">
          <n-button size="large">壁纸</n-button>
        </router-link>
        <router-link to="/homeworkView" target="_blank">
          <n-button size="large">作业看板</n-button>
        </router-link>
        <router-link to="/homeworkEdit" target="_blank">
          <n-button size="large">作业编辑器</n-button>
        </router-link>
        <router-link to="/sloganEdit" target="_blank">
          <n-button size="large">标语编辑器</n-button>
        </router-link>
        <router-link to="/settings" target="_blank">
          <n-button size="large">设置</n-button>
        </router-link>
      </n-space>
    </n-layout-content>
  </n-layout>
</template>

<style scoped>
a {
  color: unset;
  text-decoration: unset;
}
</style>
