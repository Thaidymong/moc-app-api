import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: '.env',
});

const configService = new ConfigService();

const databaseConfig: DataSourceOptions = {
  type: 'mysql',
  url: configService.getOrThrow<string>('DATABASE_URL'),
  logging: configService.get<string>('NODE_ENV') !== 'production',
  migrationsRun: true,
  entities: ['dist/src/modules/attendance/**/*.entity.js'],
  synchronize: false,
  extra: {
    connectionLimit: 10,
  },
};

export default databaseConfig;
