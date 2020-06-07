import express from 'express';
import fs from 'fs';

let router = express.Router();

router.post('/', (req, res) => {
  let account = req.body;

  fs.readFile(global.fileName, 'utf8', (err, data) => {
    if (!err) {
      try {
        const json = JSON.parse(data);
        account = { id: json.nextId++, ...account };
        json.accounts.push(account);

        fs.writeFile(global.fileName, JSON.stringify(json), (err) => {
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

router.get('/', (_, res) => {
  fs.readFile(global.fileName, 'utf8', (err, data) => {
    if (err) {
      res.status(400).send({ error: err.message });
    } else {
      const result = JSON.parse(data);
      delete result.nextId;
      res.send(result);
    }
  });
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);

  fs.readFile(global.fileName, 'utf8', (err, data) => {
    if (err) {
      res.status(400).send({ error: err.message });
    } else {
      const result = JSON.parse(data);
      const getUserId = result.accounts.find((account) => {
        return account.id === id;
      });
      if (getUserId) {
        res.send(getUserId);
      } else {
        res.status(400).send('Conta não encontrada!');
      }
    }
  });
});

export { router as accountRoute };
