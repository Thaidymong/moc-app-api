import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getAASDatabaseConfig } from './database.config';
import { ConfigService } from '@nestjs/config';
import { DatabaseEnum } from '~/common/enums';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (
        configService: ConfigService,
      ): Promise<TypeOrmModuleOptions> => {
        return getAASDatabaseConfig(configService);
      },
      inject: [ConfigService],
      name: DatabaseEnum.AAS_DATABASE,
    }),
  ],
})
export class AASTypeOrmModule {}
