<template>
  <NConfigProvider :locale="locale" :dateLocale="dateLocale">
    <RouterView/>
  </NConfigProvider>
</template>

<script>
import {dateZhCN, NConfigProvider, zhCN} from "naive-ui";
import RouterView from "vue-router";

export default {
  components: {
    NConfigProvider,
    RouterView,
  },
  data() {
    return {
      locale: zhCN,
      dateLocale: dateZhCN,
    };
  },
};
</script>
