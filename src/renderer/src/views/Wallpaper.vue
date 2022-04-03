<script setup lang="ts">
import useHomeworks from '../stores/homeworks';

const homeworks = useHomeworks();

</script>

<template>
  <div>
    <p>
      {{ homeworks.chinese }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
</style>
