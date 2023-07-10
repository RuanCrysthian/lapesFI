import express from 'express';
import bodyParser from 'body-parser';
import resourceRoutes from './routes/resourceRoutes';
import faultRoutes from './routes/FaultRoutes';
import capabilitiesRoutes from './routes/capabilityRoutes';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const port: number = parseInt(process.env.PORT ?? '', 10);

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to LapesFi API');
});

app.use('/resources', resourceRoutes);
app.use('/faults', faultRoutes);
app.use('/capabilities', capabilitiesRoutes);

app.listen(port, () => {
  console.log(`Server on ${port}`);
});
