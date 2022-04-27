<script setup lang="ts">
import useSettings from '../../stores/settings';
import locale from '../../language/zh_CN.yaml';
import FontSizeSliderFormItem from '../../components/FontSizeSliderFormItem.vue';

const settings = useSettings();
</script>

<template>
  <n-form
    label-placement="left"
    label-width="auto"
  >
    <n-form-item
      :label="locale.settings.countDownName"
    >
      <n-input type="text" v-model:value="settings.countDownName"/>
    </n-form-item>
    <n-form-item
      :label="locale.settings.countDownDate"
    >
      <n-date-picker v-model:value="settings.countDownDate" type="date"/>
    </n-form-item>
    <FontSizeSliderFormItem
      :label="locale.settings.countDownSize" v-model:value="settings.countDownSize" unit="em"
    />
    <n-form-item
      :label="locale.settings.countDownColor"
    >
      <n-color-picker v-model:value="settings.countDownColor" :show-alpha="false"/>
    </n-form-item>
  </n-form>
</template>
