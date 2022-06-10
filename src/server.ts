import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import helmet from 'helmet'
import errorHandler from './middleware/errorhandler'
import db from './database/database'
import routes from './routes/index'
dotenv.config()

const PORT = process.env.PORT || 3000
// create an instance server
const app: Application = express()
// HTTP request logger middleware
app.use(morgan('short'))

app.use(helmet())
app.use('/api', routes)

// add routing for / path
app.get('/', (req: Request, res: Response) => {
  throw new Error(' Erro happend while loading')

  res.send('Welcom to Storefront Project')
})

db.connect().then((client) => {
  return client
    .query('SELECT NOW()')
    .then((res) => {
      client.release()
      console.log(res.rows)
    })
    .catch((err) => {
      client.release()
      console.log(err.message)
    })
})

app.use(errorHandler)

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'not availanle' })
})

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at prot:${PORT}`)
})

export default app
