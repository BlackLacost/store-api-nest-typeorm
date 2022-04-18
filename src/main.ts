import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Интернет магазин')
    .setDescription('Учебный проект интерент магазина для портфолио')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, { customSiteTitle: 'Store API' });

  const PORT = 5000;
  await app.listen(PORT, () => {
    console.log(`API on http://localhost:${PORT}/api/`);
  });
}
bootstrap();
