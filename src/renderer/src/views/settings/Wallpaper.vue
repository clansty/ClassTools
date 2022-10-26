<script setup lang="ts">
import settings from '../../stores/settings';
import locale from '../../language/zh_CN.yaml';
</script>

<template>
  <n-form
    label-placement="left"
    label-width="auto"
  >
    <FontSizeSliderFormItem
      :label="locale.settings.fontSize" v-model:value="settings.fontSize" unit="vw"
    />
    <FontSizeSliderFormItem
      :label="locale.settings.scheduleSize" v-model:value="settings.scheduleSize" unit="em"
    />
    <n-form-item
      :label="locale.settings.fontColor"
    >
      <n-color-picker v-model:value="settings.fontColor" :show-alpha="false"/>
    </n-form-item>
    <n-form-item
      :label="locale.settings.shadowColor"
    >
      <n-color-picker v-model:value="settings.shadowColor" :show-alpha="true"/>
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
  </n-form>
</template>
