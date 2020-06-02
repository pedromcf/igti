import express from 'express';
import winston from 'winston';

//comando de inicialização
//nodemon --experimental-modules .\src\app.js

const app = express();
const port = 3000;

const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'grades-control-api.log' }),
  ],
  format: combine(
    label({ label: 'grades-control-api' }),
    timestamp(),
    myFormat
  ),
});

logger.error('Error log');
logger.warn('Warn log');
logger.info('Info log');
logger.verbose('Verbose log');
logger.debug('Debug log');
logger.silly('Silly log');
logger.log('info', 'Hello with parameter!');

app.get('/', (req, res) => res.send('Olá, Mundo!'));
app.post('/', (req, res) => res.send('Olá, Mundo Post!'));

app.all('/testAll', (req, res) => res.send(req.method));

app.get('/teste?', (_, res) => res.send('/teste?'));

app.get('/buzz+', (_, res) => res.send('/buzz+'));

app.get('/one*Blue', (_, res) => res.send('/one*Blue'));

app.post('/test(ing)?', (_, res) => res.send('/test(ing)?'));

app.get(/.*Red$/, (_, res) => res.send('/.*Red$/'));

app.get('/testParam/:id/:a', (req, res) => {
  res.send(`${req.params.id} ${req.params.a}`);
});

app.get(
  '/testMultipleHandles',
  (_, res, next) => {
    console.log(`First Method`);
    next();
  },
  (_, res) => {
    console.log(`Second method`);
    res.end();
  }
);

const callback1 = (req, res, next) => {
  console.log(`Callback 1`);
  next();
};

const callback2 = (req, res, next) => {
  console.log(`Callback 2`);
  res.end();
};

app.get('/testMultipleHandlesArray', [callback1, callback2]);

app
  .route('/testRoute')
  .get((req, res) => {
    res.send(req.method);
  })
  .post((req, res) => {
    res.send(req.method);
  })
  .delete((req, res) => {
    res.send(req.method);
  });

app.use((req, res, next) => {
  console.log(new Date());
  next();
});

app.use('/testMiddleware', (req, res, next) => {
  console.log('/testMiddleware');
  if (req.method === 'GET') {
    next();
  } else {
    res.end();
  }
});

app.get('/testMiddleware', (req, res) => {
  console.log(req);
  res.send('GET /testMiddleware');
});

app.post('/testError', async (req, res, next) => {
  try {
    throw new Error('Error message');
  } catch (err) {
    next(err);
  }
});

app.use(function (err, req, res, next) {
  console.log('Error 1');
  next(err);
});

app.use((err, req, res, next) => {
  console.log('Error 2');
  res.status(500).send('An error ocurred!');
});

app.listen(port, () => {
  console.log(`App Listening on port ${port}`);
});
