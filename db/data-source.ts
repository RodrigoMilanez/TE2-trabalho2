import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    database: 'TE2',
    username: 'postgres',
    password: '1234',
    port: 5432,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/db/migrations/*.js'],
}

export default new DataSource(dataSourceOptions);