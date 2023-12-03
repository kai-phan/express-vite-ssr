import { hydrateRoot } from 'react-dom/client';

import App from './app';

let data = null;

if (window.__INITIAL_DATA__) {
  data = window.__INITIAL_DATA__;
}

hydrateRoot(document.getElementById('app'), <App data={data} />);