<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  accept: string,
}>();
const emit = defineEmits<{
  (e: 'select', file: File): void
}>();

const selectorRef = ref<HTMLInputElement>();

const handleSelect = () => {
  const files = selectorRef.value.files;
  if (!files.length) return;
  emit('select', files[0]);
};
</script>

<template>
  <input type="file" :accept="props.accept" v-show="false" ref="selectorRef" @change="handleSelect">
  <n-button @click="selectorRef.click()">
    <slot/>
  </n-button>
</template>
