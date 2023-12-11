const App = ({ props, Component }) => {

  return (
    <main>
      {Component && typeof Component === 'function' && <Component {...props} />}
    </main>
  );
};

export default App;