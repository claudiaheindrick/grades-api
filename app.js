import express from 'express';
import cors from 'cors';
import { gradeRouter } from './routes/grade.js';
import { db } from './models/index.js';

(async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    process.exit();
  }
})();

const app = express();

//define o dominio de origem para consumo do servico
app.use(express.json());
app.use(gradeRouter);
app.use((req, res, next) => {
  // cors({
  //   //origin: 'http://localhost:8080',
  //   origin: 'https://claudiaheindrick-grades-app.herokuapp.com',
  // })
  res.header(
    'Access-Control-Allow-Origin',
    'https://claudiaheindrick-grades-app.herokuapp.com'
  );
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  app.use(cors());
  next();
});

app.get('/', (req, res) => {
  res.send('API em execucao');
});

app.listen(process.env.PORT || 8081, () => {
  console.log(`API Launched`);
});
