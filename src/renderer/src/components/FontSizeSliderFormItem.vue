<script setup lang="ts">
// 封装了那一个滑块一个数字调节器的字体调节表单项，方便反复调用。
import { computed } from 'vue';

const props = defineProps<{
  value: number,
  label: string,
  // px 和 em 有不同的范围和步长
  unit: 'vw' | 'em'
}>();
const emit = defineEmits<{
  (e: 'update:value', value: number): void
}>();

const inputProps = computed(() => {
  switch (props.unit) {
    case 'em':
      return { min: 0.3, max: 10, sliderStep: 0.01, inputStep: 0.05 };
    case 'vw':
      return { min: 0.5, max: 3, sliderStep: 0.01, inputStep: 0.05 };
  }
});
// 用于 v-model，也可以把下面组件的 v-model 换成 :value= 和 @update:value（这样难看）
const value = computed({
  get: () => props.value,
  set: (value) => emit('update:value', value),
});
</script>

<template>
  <n-form-item :label="props.label">
    <n-slider v-model:value="value" :min="inputProps.min" :max="inputProps.max" :step="inputProps.sliderStep"/>
    <div style="width: 100px; margin-left: 20px; flex-shrink: 0">
      <!-- n-input-number 好像有点问题，不能直接在上面加 style，会不生效 -->
      <n-input-number v-model:value="value" :min="inputProps.min" :max="inputProps.max" :step="inputProps.inputStep"/>
    </div>
  </n-form-item>
</template>
