<script setup lang="ts">
import settings from '../../stores/settings';
import locale from '../../language/zh_CN.yaml';


</script>

<template>
  <n-form
    label-placement="top"
    label-width="auto"
  >
    <n-form-item
      :label="locale.settings.dutyTypes"
    >
      <n-dynamic-tags v-model:value="settings.dutyTypes"/>
    </n-form-item>
    <n-form-item
      v-for="(name, weekday) in locale.weekdays"
      :label="name"
    >
      <n-space vertical style="width: 100%">
        <n-input-group v-for="type in settings.dutyTypes">
          <!-- 不知道组件库什么毛病，label 都被挤掉了 -->
          <n-input-group-label style="flex-shrink: 0">{{ type }}</n-input-group-label>
          <n-input v-model:value="settings.duty[weekday][type]" :placeholder="`${name}${type}值日生`"/>
        </n-input-group>
      </n-space>
    </n-form-item>
  </n-form>

</template>
