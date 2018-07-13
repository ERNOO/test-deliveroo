import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import Home from "./Components/Home.js";
/* import About from "./Components/About.js";
import Topics from "./Components/Topics.js"; */
import MyLogo from "./Components/Logo.js";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div id="header">
            <MyLogo
              url={
                "https://upload.wikimedia.org/wikipedia/fr/f/f7/Deliveroo_logo.svg"
              }
            />
          </div>
          {/* 
          <div>
            <ul>
            <li>
           <Link to="/">Home</Link>
           </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/topics">Topics</Link>
              </li>
            </ul> */}

          <Route exact={true} path="/" component={Home} />
          {/*   <Route path="/about" component={About} />
            <Route path="/topics" component={Topics} /> 
          </div>*/}
        </div>
      </Router>
    );
  }
}

export default App;
