import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Posts from './components/Posts';

const App = () => {
  return (
    <main>
      <h1>
        Rendering posts with <strong>useApi</strong> hook
      </h1>
      <Posts />
    </main>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
