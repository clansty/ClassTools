<script setup lang="ts">
import useSettings from '../../stores/settings';
import locale from '../../language/zh_CN.yaml';
import { ref } from 'vue';
import FontSizeSliderFormItem from '../../components/FontSizeSliderFormItem.vue';
import { formatDate } from '@vueuse/core';

const settings = useSettings();
const wallpaperSelectorRef = ref<HTMLInputElement>();
const configSelectorRef = ref<HTMLInputElement>();

const handleSelectWallpaper = () => {
  const files = wallpaperSelectorRef.value.files;
  if (!files.length) return;
  settings.value.backgroundImage = files[0].path;
};
const handleSelectConfig = async () => {
  const files = configSelectorRef.value.files;
  if (!files.length) return;
  settings.value = JSON.parse(await files[0].text());
};
const configExport = () => {
  const blob = new Blob([JSON.stringify(settings.value)]);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `classtools-config_${formatDate(new Date(), 'YYYYMMDDHHmmss')}.json`;
  link.click();
};
</script>

<template>
  <n-form
    label-placement="left"
    label-width="auto"
  >
    <FontSizeSliderFormItem
      :label="locale.settings.fontSize" v-model:value="settings.fontSize" unit="vw"
    />
    <n-form-item
      :label="locale.settings.fontColor"
    >
      <n-color-picker v-model:value="settings.fontColor" :show-alpha="false"/>
    </n-form-item>
    <FontSizeSliderFormItem
      :label="locale.settings.dateSize" v-model:value="settings.dateSize" unit="em"
    />
    <n-form-item
      :label="locale.settings.backgroundType"
    >
      <n-radio-group v-model:value="settings.backgroundType">
        <n-radio-button value="image">{{ locale.settings.backgroundTypeImage }}</n-radio-button>
        <n-radio-button value="color">{{ locale.settings.backgroundTypeColor }}</n-radio-button>
        <n-radio-button value="advanced">{{ locale.settings.backgroundTypeAdvanced }}</n-radio-button>
      </n-radio-group>
    </n-form-item>
    <n-form-item
      :label="locale.settings.backgroundImage"
      v-if="settings.backgroundType === 'image'"
    >
      <n-input-group>
        <n-input v-model:value="settings.backgroundImage" disabled/>
        <input type="file" accept="image/*" v-show="false" ref="wallpaperSelectorRef" @change="handleSelectWallpaper">
        <n-button @click="wallpaperSelectorRef.click()">选择</n-button>
      </n-input-group>
    </n-form-item>
    <n-form-item
      :label="locale.settings.backgroundColor"
      v-if="settings.backgroundType === 'color'"
    >
      <n-color-picker v-model:value="settings.backgroundColor" :show-alpha="false"/>
    </n-form-item>
    <n-form-item
      :label="locale.settings.backgroundCss"
      v-if="settings.backgroundType === 'advanced'"
    >
      <n-input type="textarea" v-model:value="settings.backgroundCss" autosize/>
    </n-form-item>
    <n-form-item
      :label="locale.settings.configImportExport"
    >
      <input type="file" accept="application/json" v-show="false" ref="configSelectorRef" @change="handleSelectConfig">
      <n-space>
        <n-button @click="configExport">{{ locale.settings.export }}</n-button>
        <n-button @click="configSelectorRef.click()">{{ locale.settings.import }}</n-button>
      </n-space>
    </n-form-item>
  </n-form>
</template>
