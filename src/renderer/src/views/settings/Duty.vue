<script setup lang="ts">
import useSettings from '../../stores/settings';
import locale from '../../language/zh_CN.yaml';

const settings = useSettings();

</script>

<template>
  <n-form
    label-placement="left"
    label-width="auto"
  >
    <n-form-item
      v-for="(name, weekday) in locale.weekdays"
      :label="name"
    >
      <n-input type="textarea" v-model:value="settings.duty[weekday]"
               :placeholder="`${name}值日生`" :autosize="{minRows:2}"/>
    </n-form-item>
  </n-form>

</template>
