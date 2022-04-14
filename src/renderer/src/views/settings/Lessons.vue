<script setup lang="ts">
import useSettings from '../../stores/settings';

const settings = useSettings();
</script>

<template>
  <n-dynamic-input v-model:value="settings.lessons" :on-create="()=>({ name: '', hasHomework: true })">
    <template #default="{ value }">
      <div style="display: flex; align-items: center; width: 100%">
        <n-input v-model:value="value.name" type="text"/>
        <n-checkbox
          v-model:checked="value.hasHomework"
          style="margin-left: 12px; flex-shrink: 0"
        >
          有作业
        </n-checkbox>
      </div>
    </template>
  </n-dynamic-input>
</template>
