import { useState } from 'react';

const App = ({ data }) => {
  const [count, setCount] = useState(data.stock);

  return (
    <main>
      <h1>App</h1>
      <p>Lorem Ipsum</p>
      <div>
        <div>{count}</div>
        <button onClick={() => setCount(count + 1)}>Count</button>
        {JSON.stringify(data)}
      </div>
    </main>
  );
};

export default App;