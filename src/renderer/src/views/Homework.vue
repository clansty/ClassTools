<script setup lang="ts">
import useHomeworks from '../stores/homeworks';

const homeworks = useHomeworks();

</script>

<template>
  <div>
    <input type="text" v-model="homeworks.chinese"/>
  </div>
</template>
