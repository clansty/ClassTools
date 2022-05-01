<script setup lang="ts">
import { computed } from 'vue';
import supportedFonts from '../utils/supportedFonts';

const props = defineProps<{
  value: string,
}>();
const emit = defineEmits<{
  (e: 'update:value', value: string): void
}>();

const value = computed({
  get: () => props.value,
  set: (value) => emit('update:value', value),
});

const options = Object.entries(supportedFonts).map(([value, label]) => ({
  value,
  label,
  style: { fontFamily: value },
}));
</script>

<template>
  <n-select v-model:value="value" filterable tag :options="options" :style="{ fontFamily: value }"/>
</template>
