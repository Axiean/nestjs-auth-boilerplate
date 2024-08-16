import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { WinstonModule } from 'nest-winston';
import { AppModule } from './app.module';
import { winstonConfig } from './shared/config';
import { GlobalExceptionFilter } from './shared/filters/global-exception.filter';

async function bootstrap() {
  // Initializing the application with Winston logging
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonConfig),
  });

  app.useGlobalFilters(new GlobalExceptionFilter());
  app.enableCors();

  // Using Helmet for basic security
  app.use(helmet());

  // app.use(cors())

  // Setting up global validation pipes for DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Swagger configuration for API documentation
  const swaggerConfig = new DocumentBuilder().setTitle('api-title').setDescription('API description').addBearerAuth({ name: 'Authorization', description: 'Please enter token ', scheme: 'Bearer', type: 'http', in: 'Header', bearerFormat: 'Bearer' }, 'access-token').setVersion('0.1').addServer('/').build();

  const swaggerOptions: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  // Creating and setting up Swagger document
  const document = SwaggerModule.createDocument(app, swaggerConfig, swaggerOptions);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT, '0.0.0.0');
}
bootstrap();
