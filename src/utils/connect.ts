import { Sequelize } from 'sequelize';
import config from 'config'

// const PGHOST = config.get<string>('PGHOST')
// const PGUSER = config.get<string>('PGUSER')
// const PGDATABASE = config.get<string>('PGDATABASE')
// const PGPASSWORD = config.get<string>('PGPASSWORD')
// const PGPORT = config.get<number>('PGPORT')

const PGHOST = process.env.DB_HOST
const PGUSER = config.get<string>('PGUSER')
const PGDATABASE = config.get<string>('PGDATABASE')
const PGPASSWORD = config.get<string>('PGPASSWORD')
const PGPORT = config.get<number>('PGPORT')

export default new Sequelize({
  dialect: "postgres",
  host: PGHOST,
  port: PGPORT,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD
},
);