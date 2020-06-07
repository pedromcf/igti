import express from 'express';
import fs from 'fs';

const app = express();

app.use(express.json());
// app.get('/', (req, res) => {
//   res.send('ola');
// });

app.post('/account', (req, res) => {
  let account = req.body;

  fs.readFile('./data/accounts.json', 'utf8', (err, data) => {
    if (!err) {
      try {
        const json = JSON.parse(data);
        account = { id: json.nextId++, ...account };
        json.accounts.push(account);

        fs.writeFile('./data/accounts.json', JSON.stringify(json), (err) => {
          if (err) {
            res.status(400).send({ error: err.message });
          } else {
            res.send('Conta cadastrada!');
          }
        });
      } catch (err) {
        console.log(err);
        res.status(400).send({ error: err.message });
      }
    } else {
      res.status(400).send({ error: err.message });
    }
  });
});

app.listen(3000, function () {
  createdFile();
  console.log('Api Started!');
});

function createdFile() {
  try {
    fs.readFile('./data/accounts.json', 'utf8', (err, data) => {
      if (err) {
        const initialJson = {
          nextId: 1,
          accounts: [],
        };
        fs.writeFile(
          './data/accounts.json',
          JSON.stringify(initialJson),
          (err) => {
            console.log(err);
          }
        );
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
