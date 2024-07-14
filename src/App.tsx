import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from './Globalstyles';
import Router from './Router';
import PageScrollTop from './component/PageScrollTop';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <PageScrollTop/>
      <GlobalStyles />
      <Router />
    </BrowserRouter>
  );
}

export default App;