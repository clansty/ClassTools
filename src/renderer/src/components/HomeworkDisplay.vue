<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  homeworks: { [subject: string]: string }
}>();

const homeworks = computed(() =>
  Object.fromEntries(
    Object.entries(props.homeworks)
      .filter(([subject, content]) => content),
  ));
</script>

<template>
  <div>
    <div v-for="(content, subject) in homeworks" style="margin-bottom: 1em">
      <n-h5 style="margin-bottom: 0">{{ subject }}</n-h5>
      <n-text tag="div">
        {{ content }}
      </n-text>
    </div>
  </div>
</template>
