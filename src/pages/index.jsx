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
    setTimeout(resolve, 3000);
  });

  return {
    props: {
      stock: 10,
    },
  };
}