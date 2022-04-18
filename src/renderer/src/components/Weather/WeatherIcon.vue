<script setup lang="ts">
import { computed } from 'vue';

const path = (id: string) => `../../assets/weather-icons/${id}.svg`;
const icons = import.meta.globEager('../../assets/weather-icons/*.svg');
const props = defineProps<{
  id: string
}>();
const component = computed(() => icons[path(props.id)]);
// TODO: 可选图标彩色或黑白
// 彩色图标地址 https://cdn.heweather.com/img/plugin/190516/icon/c/${id}d.png
</script>

<template>
  <component.default height="1em" width="1em" viewBox="0 0 16 16" v-if="component"/>
</template>
