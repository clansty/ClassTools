<script setup lang="ts">
import useSettings from '../../stores/settings';
import locale from '../../language/zh_CN.yaml';
import { formatDate } from '@vueuse/core';

const settings = useSettings();

const handleSelectConfig = async (file: File) => {
  settings.value = JSON.parse(await file.text());
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
        <FileSelectButton
          accept="image/*"
          @select="file => settings.backgroundImage = file.path"
        >
          选择
        </FileSelectButton>
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
      <n-space>
        <n-button @click="configExport">{{ locale.settings.export }}</n-button>
        <FileSelectButton accept="application/json" @select="handleSelectConfig">
          {{ locale.settings.import }}
        </FileSelectButton>
      </n-space>
    </n-form-item>
  </n-form>
</template>
