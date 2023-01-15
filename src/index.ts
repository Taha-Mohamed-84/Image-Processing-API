import express from 'express';
import routes from './routes/index';
import { Global } from './global';
const app = express();
const port = Global.port;

app.use('/imgapp', routes);

app.get('/', (req, res) => {
  res.send('connected successfully...!');
});
app.listen(port, () => {
  console.log(`server started at localhost:${port}/imgapp`);
});

export default app;
