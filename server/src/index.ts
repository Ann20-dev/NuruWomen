import { createApp } from './app.js';
import { config } from './config.js';

const app = createApp();

const server = app.listen(config.port, () => {
  console.log(
    `[startup] NuruWomen API | env=${config.nodeEnv} | port=${config.port} | ai=${config.aiServiceUrl}`,
  );
});

// Render sends SIGTERM before replacing an instance. Finish in-flight
// requests rather than cutting them off mid-response.
for (const signal of ['SIGTERM', 'SIGINT'] as const) {
  process.on(signal, () => {
    console.log(`[shutdown] ${signal} received, closing server`);
    server.close(() => process.exit(0));
  });
}