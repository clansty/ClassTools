<script setup lang="ts">
import settings from '../../stores/settings';
import locale from '../../language/zh_CN.yaml';
import { formatDate } from '@vueuse/core';

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

const dateFormats = ['yyyy-MM-dd', 'yyyy/MM/dd', 'yyyy 年 M 月 d 日'];
const dateFormatOption = dateFormats.map((value) => ({
  label: value,
  value: value,
}));

const timeFormats = ['H:mm:ss', 'HH:mm:ss', 'H:mm', 'HH:mm'];
const timeFormatOption = timeFormats.map((value) => ({
  label: value,
  value: value,
}));

const showCreateDesktopShortcut = !window.isAppx && window.fs;
</script>

<template>
  <n-form
    label-placement="left"
    label-width="auto"
  >
    <n-form-item :label="locale.settings.dateFormat">
      <n-select v-model:value="settings.dateFormat" filterable tag :options="dateFormatOption"/>
    </n-form-item>
    <n-form-item :label="locale.settings.timeFormat">
      <n-select v-model:value="settings.timeFormat" filterable tag
                :options="[...timeFormatOption, {label:'不显示', value: ''}]"/>
    </n-form-item>
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
      :label="locale.settings.font"
    >
      <FontSelector v-model:value="settings.font"/>
    </n-form-item>
    <n-form-item
      :label="locale.settings.backgroundType"
    >
      <n-radio-group v-model:value="settings.backgroundType">
        <n-radio-button v-for="(text, value) in locale.settings.backgroundTypes" :value="value">{{
            text
          }}
        </n-radio-button>
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
    <n-form-item
      :label="locale.settings.createDesktopShortcut"
      v-if="showCreateDesktopShortcut"
    >
      <n-space>
        <n-switch v-model:value="settings.createDesktopShortcut"/>
        {{ locale.settings.createDesktopShortcutRemark }}
      </n-space>
    </n-form-item>
    <n-form-item
      :label="locale.settings.autoNewDay"
    >
      <n-space>
        <n-switch v-model:value="settings.autoNewDay"/>
        {{ locale.settings.autoNewDayRemark }}
      </n-space>
    </n-form-item>
  </n-form>
</template>
