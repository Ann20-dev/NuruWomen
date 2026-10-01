import { config } from './config.js';

console.log(
  `[startup] NuruWomen API | env=${config.nodeEnv} | port=${config.port} | ai=${config.aiServiceUrl}`,
);