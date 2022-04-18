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
      :label="locale.settings.city"
    >
      <n-cascader v-model:value="settings.city" :options="cities"
                  expand-trigger="hover" :show-path="true" check-strategy="child"/>
    </n-form-item>
    <n-form-item
      :label="locale.settings.weatherKey"
    >
      <n-input type="text" v-model:value="settings.weatherKey"/>
    </n-form-item>
    <n-form-item
      :label="locale.settings.weatherComponents"
    >
      <n-checkbox-group v-model:value="settings.weatherComponents">
        <n-space item-style="display: flex;">
          <n-checkbox v-for="(label, value) in locale.settings.weatherComponentsGroup"
                      :value="value" :label="label"/>
        </n-space>
      </n-checkbox-group>
    </n-form-item>
  </n-form>
</template>
