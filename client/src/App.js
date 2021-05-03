import React from "react";
import Feedback from "./Feedback";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";
const App = () => {
  return (
    <BrowserRouter>
      <Route path='/feedback' exact component={Feedback} />
      <Route path='/' exact component={Home} />
      <Route path='/about' exact component={About} />
    </BrowserRouter>
  );
};

export default App;
