<script setup lang="ts">
import useSettings from '../../stores/settings';
import locale from '../../language/zh_CN.yaml';
import { ref } from 'vue';

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
      <n-slider v-model:value="settings.fontSize" :min="12" :max="64"/>
      <div style="width: 100px; margin-left: 20px; flex-shrink: 0">
        <!-- n-input-number 好像有点问题，不能直接在上面加 style，会不生效 -->
        <n-input-number v-model:value="settings.fontSize" :min="12"/>
      </div>
    </n-form-item>
    <n-form-item
      :label="locale.settings.fontColor"
    >
      <n-color-picker v-model:value="settings.fontColor" :show-alpha="false"/>
    </n-form-item>
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
        <input type="file" accept="image/*" v-show="false" ref="fileSelectorRef" @change="handleSelectFile">
        <n-button @click="fileSelectorRef.click()">选择</n-button>
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
  </n-form>
</template>
