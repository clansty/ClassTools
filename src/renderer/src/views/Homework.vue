<script setup lang="ts">
import useHomeworks from '../stores/homeworks';

const homeworks = useHomeworks();

</script>

<template>
  <div v-for="(homework, subject) in homeworks">
    <p><n-input type="text" v-model:value="homeworks[subject]"/></p>
  </div>
</template>
