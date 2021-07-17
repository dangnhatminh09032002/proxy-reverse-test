import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import history from "./history";
import UserProvider from "./contexts/UserProvider";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import MenuBar from "./components/menus/MenuBar";
import "./style/index.css";

const App = () => {
  return (
    <Router history={history}>
      <UserProvider>
        <Route path="/" component={MenuBar} />
        <Route path="/" component={Profile} />
      </UserProvider>
      <Route path="/" exact component={Home} />
    </Router>
  );
};

export default App;
