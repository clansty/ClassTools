<script setup lang="ts">
import useSlogan from '../stores/slogan';
import locale from '../language/zh_CN.yaml';

const slogan = useSlogan();
</script>

<template>
  <n-layout>
    <n-layout-content content-style="padding: 24px;">
      <n-form
        label-placement="top"
        label-width="auto"
      >
        <n-form-item
          :label="locale.slogan.content"
        >
          <n-input type="textarea" v-model:value="slogan.content" :autosize="{ minRows: 2 }"/>
        </n-form-item>
        <n-form-item
          :label="locale.slogan.author"
        >
          <n-input v-model:value="slogan.author"/>
        </n-form-item>
        <n-form-item
          :label="locale.slogan.size"
        >
          <n-slider v-model:value="slogan.size" :min="0.5" :max="10" :step="0.1"/>
          <div style="width: 100px; margin-left: 20px; flex-shrink: 0">
            <n-input-number v-model:value="slogan.size" :min="0.5" :step="0.1"/>
          </div>
        </n-form-item>
        <n-form-item
          :label="locale.slogan.authorSize"
        >
          <n-slider v-model:value="slogan.authorSize" :min="0.5" :max="10" :step="0.1"/>
          <div style="width: 100px; margin-left: 20px; flex-shrink: 0">
            <n-input-number v-model:value="slogan.authorSize" :min="0.5" :step="0.1"/>
          </div>
        </n-form-item>
        <n-form-item
          :label="locale.slogan.color"
        >
          <n-color-picker v-model:value="slogan.color" :show-alpha="false"/>
        </n-form-item>
        <n-form-item
          :label="locale.slogan.authorColor"
        >
          <n-color-picker v-model:value="slogan.authorColor" :show-alpha="false"/>
        </n-form-item>
      </n-form>
    </n-layout-content>
  </n-layout>
</template>
