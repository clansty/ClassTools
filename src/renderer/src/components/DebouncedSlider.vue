<script setup lang="ts">
import { ref, watch } from 'vue';
import { useDebounce } from '@vueuse/core';

const props = defineProps<{
  value: number
}>();
const emit = defineEmits<{
  (e: 'update:value', value: number): void
}>();

const localValue = ref(props.value);
const debounced = useDebounce(localValue, 100);

watch(() => props.value, (value) => {
  localValue.value = value;
});
watch(debounced, (value) => {
  emit('update:value', value);
});
</script>

<template>
  <n-slider v-model:value="localValue" v-bind="$attrs"/>
</template>
