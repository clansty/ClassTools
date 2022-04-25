<script setup lang="ts">
import useSettings from '../../stores/settings';
import locale from '../../language/zh_CN.yaml';
import { ref } from 'vue';
import FontSizeSliderFormItem from '../../components/FontSizeSliderFormItem.vue';

const settings = useSettings();
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
      :label="locale.settings.showTomorrowSchedule"
    >
      <n-switch v-model:value="settings.showTomorrowSchedule"/>
    </n-form-item>
    <n-form-item
      :label="locale.settings.showDuty"
    >
      <n-switch v-model:value="settings.showDuty"/>
    </n-form-item>
  </n-form>
</template>
