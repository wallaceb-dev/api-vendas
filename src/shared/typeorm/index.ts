import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'apivendas',
});

AppDataSource.initialize()
  .then(() => {
    console.log('💾 Data Source has benn initialized!');
  })
  .catch((err) => {
    console.log('Error during Data Souce initialization', err);
  });
