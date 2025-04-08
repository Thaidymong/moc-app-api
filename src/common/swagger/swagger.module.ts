import { INestApplication, Module } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

@Module({})
export class SwaggerConfigModule {
  static setup(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('Mobile App API')
      .setDescription('MOC Mobile App API documentation')
      .setVersion('1.0.0')
      .addBearerAuth()
      .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, documentFactory);
  }
}
