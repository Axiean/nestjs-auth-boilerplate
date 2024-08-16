import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config({
  path: `.env.${process.env.NODE_ENV}`,
});

const configService = new ConfigService();
const logger = new Logger('DataSource');

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  // url: <url> -> If you are using a URL to connect to DB
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASS'),
  database: configService.get('DB_NAME'),
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  // synchronize is true in dev env , please make it FALSE in production env and use migrations, use this link: https://orkhan.gitbook.io/typeorm/docs/migrations
  // genrating and runnning migration files scripts are provided in package.json file , you can change migrations path as desired.
  synchronize: true,
  // default migrations path
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
};

export const dataSource = new DataSource(dataSourceOptions);
dataSource
  .initialize()
  .then(() => {
    logger.log('Data Source has been initialized!');
  })
  .catch((err) => {
    logger.error('Error during Data Source initialization', err);
  });

// export dataSource;
