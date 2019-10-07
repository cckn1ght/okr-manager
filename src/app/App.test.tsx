import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App_back from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App_back />, div);
  ReactDOM.unmountComponentAtNode(div);
});
