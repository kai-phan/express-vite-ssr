import { hydrateRoot } from 'react-dom/client';

import App from './_app.jsx';

import Index from './pages/index.jsx';
import About from './pages/about.jsx';
import NotFound from './pages/404.jsx';

let Component = null;

if (window.location.pathname === '/') {
  Component = Index;
}

if (window.location.pathname === '/about') {
  Component = About;
}

if (!Component) {
  Component = NotFound;
}

let data = null;

if (window.__INITIAL_DATA__) {
  data = window.__INITIAL_DATA__;
}

hydrateRoot(document.getElementById('app'), <App {...data} Component={Component} />);