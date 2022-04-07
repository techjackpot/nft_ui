import { StrictMode } from "react";
import ReactDOM from 'react-dom';
import './assets/scss/index.scss';
import App from './App';
window.Buffer = require('buffer/').Buffer

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
