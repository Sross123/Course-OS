import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { appConstants } from 'src/constants';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle(appConstants.api.title)
    .setDescription(appConstants.api.description)
    .setVersion(appConstants.api.version)
    .addTag(
      appConstants.swagger.tags[0].name,
      appConstants.swagger.tags[0].description,
    )
    .addBearerAuth(
      {
        type: appConstants.swagger.bearerAuth.type as 'http',
        scheme: appConstants.swagger.bearerAuth.scheme,
        bearerFormat: appConstants.swagger.bearerAuth.bearerFormat,
        description: appConstants.swagger.bearerAuth.description,
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(appConstants.swagger.path, app, document, {
    swaggerOptions: appConstants.swagger.options,
  });
}
