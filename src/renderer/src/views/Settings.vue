<script setup lang="ts">
import useSettings from '../stores/settings';
import locale from '../language/zh_CN.yaml';

const settings = useSettings();
</script>

<template>
  <n-layout>
    <n-layout-content content-style="padding: 24px;">
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
          <!-- TODO: 使用级联选择器直接选择城市 -->
          <n-input type="text" v-model:value="settings.city"/>
        </n-form-item>
      </n-form>
      <p>{{ locale.settings.schedule }}</p>
      <n-grid x-gap="12" cols="7">
        <n-gi v-for="(name, weekday) in locale.weekdays">
          <n-form-item :label="name">
            <!-- TODO: 给相同的课上色？ -->
            <n-input v-model:value="settings.schedule[weekday]" type="textarea" :autosize="{ minRows: 8 }"/>
          </n-form-item>
        </n-gi>
      </n-grid>
    </n-layout-content>
  </n-layout>
</template>
