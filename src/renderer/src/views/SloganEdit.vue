<script setup lang="ts">
import slogan from '../stores/slogan';
import locale from '../language/zh_CN.yaml';
import FontSizeSliderFormItem from '../components/FontSizeSliderFormItem.vue';

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
          :label="locale.settings.font"
        >
          <FontSelector v-model:value="slogan.font"/>
        </n-form-item>
        <FontSizeSliderFormItem
          :label="locale.slogan.size" v-model:value="slogan.size" unit="em"
        />
        <FontSizeSliderFormItem
          :label="locale.slogan.authorSize" v-model:value="slogan.authorSize" unit="em"
        />
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
