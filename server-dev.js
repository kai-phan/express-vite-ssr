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

  if (url === '/favicon.ico') return res.status(404).end();

  try {
    const template = await vite.transformIndexHtml(url, fs.readFileSync('./index.html', 'utf-8'));
    const { render } = await vite.ssrLoadModule('/src/entry-server.jsx');

    const pageContext = await match(url, async (page) => await vite.ssrLoadModule(page));

    const data = await pageContext.getServersideProps?.({ req, res });
    const Component = pageContext.default;
    const metas = pageContext.getMeta?.();

    function getMeta() {
      if (!metas) return '';

      let defaultTitleTag = {
        tag: 'title',
        attributes: {},
        children: 'Vite SSR App',
      };

      if (!metas.map(({ tag }) => tag).includes('title')) {
        metas.push(defaultTitleTag);
      }

      return metas.map(({ tag, attributes, children }) => {
        const attrs = Object.entries(attributes || {}).map(([key, value]) => `${key}="${value}"`).join(' ');
        if (children) return `<${tag} ${attrs}>${children}</${tag}>`;
        return `<${tag} ${attrs} />`;
      }).join('');
    }

    const script = `<script>window.__INITIAL_DATA__ = ${JSON.stringify(data)}</script>`;

    const appHTML = render({ Component, ...data });

    const html = template
      .replace('</head>', `${getMeta()}</head>`)
      .replace('<!--outlet-->', `${appHTML} ${script}`);

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

async function match(url, cb) {
  if (url === '/') return await cb('/src/pages/index.jsx');
  if (url === '/about') return await cb('/src/pages/about.jsx');

  return await cb('/src/pages/404.jsx');
}