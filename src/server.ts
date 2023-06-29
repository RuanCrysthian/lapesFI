import express from 'express';
import bodyParser from 'body-parser';
import resourceRoutes from './routes/resourceRoutes';
import errorRoutes from './routes/errorRoutes';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to LapesFi API');
});

app.use('/resources', resourceRoutes);
app.use('/errors', errorRoutes);

app.listen(port, () => {
  console.log(`Server on ${port}`);
});
