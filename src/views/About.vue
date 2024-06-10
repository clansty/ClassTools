<script setup lang="ts">
import icon from '../assets/icon.webp';
import pkg from '../../package.json';
import GithubIcon from '../assets/icons/Github.svg';

const COMMIT_HASH = window.COMMIT_HASH;
const BUILD_DATE = window.BUILD_DATE;
</script>

<template>
  <n-layout>
    <n-layout-content content-style="padding: 24px; display: flex; flex-direction: column; align-items: center">
      <img :src="icon" alt="图标" width="120">
      <n-h2 style="margin: 0.3em 0">{{ pkg.productName }}</n-h2>
      <n-text depth="3" tag="div">
        {{ pkg.version }} ({{ COMMIT_HASH }})
      </n-text>
      <n-text depth="3" tag="div">
        构建日期:
        <n-time :time="BUILD_DATE" format="yyyy/M/d H:mm:ss"/>
      </n-text>
      <a href="https://github.com/Clansty/ClassTools" target="_blank"
         style="display: flex; align-items: center; font-size: 1.2em; color: unset; margin: 0.3em 0">
        <GithubIcon/>
        GitHub
      </a>
    </n-layout-content>
  </n-layout>
</template>
