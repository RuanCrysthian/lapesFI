import express from 'express';
import bodyParser from 'body-parser';
import resourceRoutes from './routes/resourceRoutes';
import errorRoutes from './routes/errorRoutes';
import sensor_valuesRoutes from './routes/sensor_valueRoutes';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const port: number = parseInt(process.env.PORT ?? '', 10);

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to LapesFi API');
});

app.use('/resources', resourceRoutes);
app.use('/errors', errorRoutes);
app.use('/capabilities', sensor_valuesRoutes);

app.listen(port, () => {
  console.log(`Server on ${port}`);
});
