<script setup lang="ts">
import locale from '../language/zh_CN.yaml'
import useHomeworks from '../stores/homeworks';

const homeworks = useHomeworks();

</script>

<template>
  <n-form
    label-placement="left"
    label-width="auto"
  >
    <n-form-item
      v-for="(homework, subject) in homeworks"
      :label="locale.subject[subject]"
    >
      <n-input type="text" v-model:value="homeworks[subject]"/>
    </n-form-item>
  </n-form>
</template>
