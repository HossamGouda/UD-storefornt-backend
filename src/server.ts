import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import errorHandler from './middleware/errorhandler';
import routes from './routes/index';

dotenv.config();
const PORT = process.env.PORT || 3000;
// create an instance server
const app: Application = express();
// HTTP request logger middleware
app.use(morgan('short'));

app.use(helmet());

//using express parsing insteated of body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', routes);
app.get('/', (req: Request, res: Response) => {
  res.send(' Welcom to Storefornt UD Project  ');
});

app.use(errorHandler);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'this route is not available' });
});
// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at prot:${PORT}`);
});

export default app;
