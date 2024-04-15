import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from './Globalstyles';
import Router from './Router';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Router />
    </BrowserRouter>
  );
}

export default App;