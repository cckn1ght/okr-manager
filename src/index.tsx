import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.scss';
import {BrowserRouter as Router} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import App from "./app/App";

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();

