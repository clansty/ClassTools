<script setup lang="ts">
import settings from '../../stores/settings';
import locale from '../../language/zh_CN.yaml';
import { ref } from 'vue';
import FontSizeSliderFormItem from '../../components/FontSizeSliderFormItem.vue';

const fileSelectorRef = ref<HTMLInputElement>();

const handleSelectFile = () => {
  const files = fileSelectorRef.value.files;
  if (!files.length) return;
  settings.value.backgroundImage = files[0].path;
};
</script>

<template>
  <n-form
    label-placement="left"
    label-width="auto"
  >
    <FontSizeSliderFormItem
      :label="locale.settings.homeworkViewerSize" v-model:value="settings.homeworkViewerSize" unit="vw"
    />
    <n-form-item
      :label="locale.settings.homeworkViewerCols"
    >
      <n-input-number v-model:value="settings.homeworkViewerCols" :min="1"/>
    </n-form-item>
    <n-form-item
      :label="locale.settings.showSchedule"
    >
      <n-switch v-model:value="settings.showSchedule"/>
    </n-form-item>
    <n-form-item
      :label="locale.settings.showTomorrowScheduleAfter"
    >
      <n-time-picker v-model:value="settings.showTomorrowScheduleAfter"/>
    </n-form-item>
    <n-form-item
      :label="locale.settings.showDuty"
    >
      <n-switch v-model:value="settings.showDuty"/>
    </n-form-item>
  </n-form>
</template>
