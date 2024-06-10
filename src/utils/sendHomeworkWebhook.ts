import settings from '../stores/settings';
import { NotificationApiInjection } from 'naive-ui/es/notification/src/NotificationProvider';
import storeHomeworks from '../stores/homeworks';
import { formatDate } from '@vueuse/core';

export default async (notification: NotificationApiInjection, isDebug = false) => {
  if (!settings.value.homeworkWebHookUrl) return;
  if (!Object.entries(storeHomeworks.value).length) return;
  try {
    const homeworks = Object.entries(storeHomeworks.value.homeworks)
      .filter(([subject, content]) => content)
      .map(([subject, content]) => subject + ':\n' + content)
      .join('\n\n');
    const body = settings.value.homeworkWebHookContent.replaceAll('${}',
      `${formatDate(new Date(storeHomeworks.value.date), 'YYYY/MM/DD')} 日作业\n` + homeworks);
    const res = await fetch(settings.value.homeworkWebHookUrl, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body,
    });
    if (!res.ok) {
      throw new Error(await res.text());
    }
    if (isDebug) {
      notification.success({
        content: await res.text(),
        title: '测试成功',
        duration: 10000,
      });
    }
  }
  catch (e) {
    console.log(e);
    notification.error({
      content: e.message,
      title: '错误',
      duration: 10000,
    });
  }
}
