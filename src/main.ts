import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  setupSwagger(app);

  const PORT = 5000;
  await app.listen(PORT);
  console.log(`API on ${await app.getUrl()}/api/`);
}
bootstrap();
