import express from 'express';
import fs from 'fs';
import { accountRoute } from './routes/accounts.js';

global.fileName = './data/accounts.json';

const app = express();

app.use(express.json());
app.use('/account', accountRoute);

app.listen(3000, function () {
  createdFile();
  console.log('Api Started!');
});

function createdFile() {
  try {
    fs.readFile(global.fileName, 'utf8', (err, data) => {
      if (err) {
        const initialJson = {
          nextId: 1,
          accounts: [],
        };
        fs.writeFile(global.fileName, JSON.stringify(initialJson), (err) => {
          console.log(err);
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
}

async function accountsList() {
  const accounts = await fs.readFile('./data/accounts.json');
  const data = JSON.parse(accounts);

  console.log(data);
}
