import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to LapesFi API');
});

app.listen(port, () => {
  console.log(`Server on http://localhost:${port}`);
});
