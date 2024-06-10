<script setup lang="ts">
import settings from '../../stores/settings';
import locale from '../../language/zh_CN.yaml';
import FontSizeSliderFormItem from '../../components/FontSizeSliderFormItem.vue';
import sendHomeworkWebhook from '../../utils/sendHomeworkWebhook';
import { useNotification } from 'naive-ui';

const notification = useNotification();
</script>

<template>
  <n-form
    label-placement="left"
    label-width="auto"
  >
    <FontSizeSliderFormItem
      :label="locale.settings.homeworkViewerSize" v-model:value="settings.homeworkViewerSize" unit="vw"
    />
    <FontSizeSliderFormItem
      :label="locale.settings.scheduleSize" v-model:value="settings.scheduleSizeHomeworkView" unit="em"
    />
    <n-form-item
      :label="locale.settings.homeworkViewerCols"
    >
      <n-input-number v-model:value="settings.homeworkViewerCols" :min="1"/>
    </n-form-item>
    <n-form-item
      :label="locale.settings.showSchedule"
    >
      <n-switch v-model:value="settings.showSchedule"/>
    </n-form-item>
    <n-form-item
      :label="locale.settings.showTomorrowScheduleAfter"
    >
      <n-time-picker v-model:formatted-value="settings.showTomorrowScheduleAfter"/>
    </n-form-item>
    <n-form-item
      :label="locale.settings.showDuty"
    >
      <n-switch v-model:value="settings.showDuty"/>
    </n-form-item>
    <n-form-item
      :label="locale.settings.showTomorrowDutyAfter"
    >
      <n-time-picker v-model:formatted-value="settings.showTomorrowDutyAfter"/>
    </n-form-item>
  </n-form>
  <n-collapse arrow-placement="right">
    <n-collapse-item :title="locale.settings.advancedSettings" name="1">
      <p>{{ locale.settings.homeworkWebHook }}</p>
      <n-form-item
        label-placement="left"
        :label="locale.settings.homeworkWebHookUrl"
      >
        <n-input v-model:value="settings.homeworkWebHookUrl"/>
      </n-form-item>
      <n-grid x-gap="12" cols="7">
        <n-gi v-for="(name, weekday) in locale.weekdays">
          <p style="font-weight: bold">{{ name }}</p>
          <p>
            <n-time-picker v-model:formatted-value="settings.homeworkWebHookTime[weekday]" format="HH:mm"/>
          </p>
        </n-gi>
      </n-grid>
      <n-form-item
        :label="locale.settings.homeworkWebHookContent"
      >
        <n-input v-model:value="settings.homeworkWebHookContent" type="textarea" :autosize="true"/>
      </n-form-item>
      <p>
        <n-button @click="()=>sendHomeworkWebhook(notification, true)">立即发送</n-button>
      </p>
    </n-collapse-item>
  </n-collapse>
</template>
