import express from 'express';
import { promises } from 'fs';

const { readFile, writeFile } = promises;

const router = express.Router();

router.get('/campeao', async (req, res) => {
  res.send(await retornarCampeao());
});

async function retornarCampeao() {
  const resp = await readFile('./times.json');
  const data = JSON.parse(resp);
  return data[0];
}

export default router;
