import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import * as Sentry from '@sentry/vue';
import { BrowserTracing } from '@sentry/tracing';
import pkg from '../../../package.json';

const app = createApp(App);

app.use(router);
app.mount('#app');

Sentry.init({
  app,
  dsn: 'https://79464d2a06ec43b9a99d1d4009ce0b99@o1243132.ingest.sentry.io/6398404',
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
    }),
  ],
  release: pkg.version,
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});
