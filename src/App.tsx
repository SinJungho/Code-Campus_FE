import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "./Globalstyles";
import Router from "./Router";
import PageScrollTop from "./components/PageScrollTop";
import useLogin from "./hooks/useLogin";

const App: React.FC = () => {
  const { refreshLogin } = useLogin();

  useEffect(() => {
    refreshLogin();
  }, []);
  
  return (
    <BrowserRouter>
      <PageScrollTop />
      <GlobalStyles />
      <Router />
    </BrowserRouter>
  );
};

export default App;
