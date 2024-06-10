<script setup lang="ts">
import settings from '../../stores/settings';
import locale from '../../language/zh_CN.yaml';

</script>

<template>
  <n-input type="textarea" v-model:value="settings.namelist" :autosize="{ minRows: 10 }"
           :placeholder="locale.settings.namelistTips"/>
</template>
