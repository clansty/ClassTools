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
    <div v-for="(content, subject) in homeworks" style="margin: 0.7em 0">
      <h5 style="margin-top: 0; margin-bottom: 0.4em">{{ subject }}</h5>
      <div style="padding-left: 1em; word-wrap: break-word; white-space: pre-wrap">
        {{ content }}
      </div>
    </div>
  </div>
</template>
