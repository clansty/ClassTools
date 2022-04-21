<script setup lang="ts">
import useSlogan from '../stores/slogan';
import { computed } from 'vue';

const slogan = useSlogan();

const containerStyle = computed(() => ({
  '--size': slogan.value.size + 'em',
  '--author-size': slogan.value.authorSize + 'em',
  '--color': slogan.value.color,
  '--author-color': slogan.value.authorColor,
}));
</script>

<template>
  <div :style="containerStyle">
    <pre>{{ slogan.content }}</pre>
    <p>——{{ slogan.author }}</p>
  </div>
</template>

<style scoped>
pre {
  color: var(--color);
  font-size: var(--size);
  margin: 0.7em 0;
  word-wrap: break-word;
  white-space: pre-wrap;
  text-align: center;
}

p {
  color: var(--author-color);
  font-size: var(--author-size);
  margin: 0.7em 0;
  text-align: right;
}
</style>
