import { Pool } from 'pg'
import * as dotenv from 'dotenv'
import config from '../config'

dotenv.config()

const pool = new Pool({
  host: config.host,
  database: config.database,
  user: config.user,
  password: config.password,
  port: parseInt(config.dbPort as string, 10),
})

pool.on('error', (error: Error) => {
  console.error(error.message)
})

export default pool
