<script setup lang="ts">
import settings from '../../stores/settings';
import locale from '../../language/zh_CN.yaml';
</script>

<template>
  <n-form-item
    :label="locale.settings.dutyTypes"
    label-placement="top"
    label-width="auto"
  >
    <n-dynamic-tags v-model:value="settings.dutyTypes"/>
  </n-form-item>
  <n-space vertical :size="25">
    <!-- 每天 -->
    <div v-for="(name, weekday) in locale.weekdays">
      <n-space vertical style="width: 100%">
        <n-space justify="space-between" align="center">
          <!-- 周几 -->
          {{ name }}
          <n-space>
            <n-dropdown trigger="click" :options="locale.weekdays.map((name,index)=>({label: name,key: index}))"
                        @select="key => settings.duty[key] = {...settings.duty[weekday]}">
              <!-- 复制 -->
              <n-button>{{ locale.settings.copy }}</n-button>
            </n-dropdown>
            <!-- 清除 -->
            <n-button @click="() => settings.duty[weekday] = {}">{{ locale.settings.clear }}</n-button>
          </n-space>
        </n-space>
        <n-input-group v-for="type in settings.dutyTypes">
          <!-- 不知道组件库什么毛病，label 都被挤掉了 -->
          <n-input-group-label style="flex-shrink: 0">{{ type }}</n-input-group-label>
          <n-input v-model:value="settings.duty[weekday][type]" :placeholder="`${name}${type}值日生`"/>
        </n-input-group>
      </n-space>
    </div>
  </n-space>

</template>
