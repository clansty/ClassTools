<script setup lang="ts">
import useSettings from '../../stores/settings';
import locale from '../../language/zh_CN.yaml';
import cities from '../../data/cities.json';

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
    <n-form-item
      :label="locale.settings.fontSize"
    >
      <n-slider v-model:value="settings.fontSize" :min="8" :max="64"/>
      <div style="width: 100px; margin-left: 20px; flex-shrink: 0">
        <!-- n-input-number 好像有点问题，不能直接在上面加 style，会不生效 -->
        <n-input-number v-model:value="settings.fontSize"/>
      </div>
    </n-form-item>
    <n-form-item
      :label="locale.settings.fontColor"
    >
      <n-color-picker v-model:value="settings.fontColor" :show-alpha="false"/>
    </n-form-item>
    <n-form-item
      :label="locale.settings.city"
    >
      <n-cascader v-model:value="settings.city" :options="cities"
                  expand-trigger="hover" :show-path="true" check-strategy="child"/>
    </n-form-item>
  </n-form>
</template>
