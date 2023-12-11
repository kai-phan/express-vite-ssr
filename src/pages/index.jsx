import { useState } from 'react';

export default function Page({ stock }) {
  const [count, setCount] = useState(stock);

  return (
    <>
      <h1>Page index</h1>
      <a href="/about">About</a>
      <div>
        <div>{count}</div>
        <button onClick={() => setCount(count + 1)}>Count</button>
      </div>
    </>
  );
}

export const getServersideProps = async () => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  return {
    props: {
      stock: 10,
    },
  };
}

export const getMeta = () => {
  return [
    {
      tag: 'meta',
      attributes: {
        name: 'description',
        content: 'This is index page',
      }
    },
    {
      tag: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css',
      }
    },
    {
      tag: 'link',
      attributes: {
        rel: 'icon',
        href: 'https://www.google.com/favicon.ico',
      }
    }
  ]
}