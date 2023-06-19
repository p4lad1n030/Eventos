import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
// import das views da aplicação
import  SignIn  from "./view/index/index";
const App = () => {
  return (
    <Router>
      <SignIn/>
    </Router>
  );
}

export default App;
