import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { DatabaseEnum } from '~/common/enums';

ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: '.env',
});

export const getAASDatabaseConfig = (
  configService: ConfigService,
): DataSourceOptions => ({
  type: 'mysql',
  name: DatabaseEnum.AAS_DATABASE,
  url: configService.getOrThrow<string>('AAS_DATABASE_URL'),
  logging: configService.get<string>('NODE_ENV') !== 'production',
  entities: ['dist/src/modules/aas/**/*.entity.js'],
  synchronize: false,
  migrationsRun: false,
  extra: {
    connectionLimit: 10,
  },
});
