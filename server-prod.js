import express from 'express';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const app = express();

app.use(express.static(path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'dist/client')));

app.use('*', async (req, res) => {
  try {
    const template = fs.readFileSync('./dist/client/index.html', 'utf-8');
    const { render } = await import('./dist/server/entry-server.js');
    const { getServerData } = await import('./dist/server/functions.js');

    const data = await getServerData();
    const script = `<script>window.__INITIAL_DATA__ = ${JSON.stringify(data)}</script>`;

    res.status(200).set({ 'Content-Type': 'text/html' }).end(template.replace('<!--outlet-->', `${render(data)} ${script}`));
  } catch (e) {
    console.log(e);
    res.status(500).end(e);
  }
});

app.listen(5173, () => {
  console.log('http://localhost:5173');
});