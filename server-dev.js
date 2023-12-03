import express from 'express';
import fs from 'fs';
import { createServer } from 'vite';

const app = express();

const vite = await createServer({
  server: {
    middlewareMode: true,
  },
  appType: 'custom',
});

app.use(vite.middlewares);

app.use('*', async (req, res) => {
  const url = req.originalUrl;

  try {
    const template = await vite.transformIndexHtml(url, fs.readFileSync('./index.html', 'utf-8'));
    const { render } = await vite.ssrLoadModule('/src/entry-server.jsx');

    const html = template.replace('<!--outlet-->', render);
    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  } catch (e) {
    vite.ssrFixStacktrace(e);
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});