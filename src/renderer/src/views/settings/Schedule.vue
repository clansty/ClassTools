<script setup lang="ts">
import useSettings from '../../stores/settings';
import locale from '../../language/zh_CN.yaml';

const settings = useSettings();
</script>

<template>
  <p>{{ locale.settings.schedule }}</p>
  <n-grid x-gap="12" cols="7">
    <n-gi v-for="(name, weekday) in locale.weekdays">
      <n-form-item :label="name">
        <!-- TODO: 给相同的课上色？ -->
        <n-input v-model:value="settings.schedule[weekday]" type="textarea" :autosize="{ minRows: 8 }"/>
      </n-form-item>
    </n-gi>
  </n-grid>
</template>
