import { renderToString } from 'react-dom/server';

import App from './_app.jsx';

export const render = (props) => {
  return renderToString(<App {...props} />);
};