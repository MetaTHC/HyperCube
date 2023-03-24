import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import { join } from 'path';
import { setupSwagger } from './config/swagger/swagger.config';
import * as http from 'http';
import serverConfig from './apps/cube/config/server';
import logging from './config/logger/cube.logging';
import { setupConsole } from './config/logger/console.logging';

async function bootstrap() {
  const NAMESPACE = 'TH²';
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // logger: ['error', 'warn', 'debug'],
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT'],
    },
    // httpsOptions,
  });

  const globalPrefix = 'v1';
  app.setGlobalPrefix(globalPrefix);

  const port = process.env.NODE_PORT || 3021;

  app.use(cookieParser());
  app.use(compression());
  app.useStaticAssets(join(__dirname, '..', './web/assets'));
  app.setBaseViewsDir(join(__dirname, '..', './web'));
  app.setViewEngine('ejs');

  const httpServer = http.createServer();

  // ----| [ CONNECTION ] |----
  setupSwagger(app);
  setupConsole();
  await app.listen(port);

  httpServer.listen(serverConfig.server.port, () =>
    logging.info(
      NAMESPACE,
      `Server is running ${serverConfig.server.hostname}:${serverConfig.server.port}`,
    ),
  );
}

void bootstrap();
