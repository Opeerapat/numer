import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import home from './page/home';
import bisec from './page/bisec';
import falseposit from './page/falseposit';
import newton from './page/newton';
import onepoint from './page/onepoint';
import secant from './page/secant';
import Navbar from './component/Navbar';
import singletrap from './page/singletrap';
import composittrap from './page/composittrap';
import { Jumbotron } from './component/Jumbotron';
import diff from './page/diff';
import simpson from './page/simpson';
import compossim from './page/compossim'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className="container">
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={home} />
              <Route exact path="/home" component={home} />
              <Route exact path="/bisec" component={bisec} />
              <Route exact path="/falseposit" component={falseposit} />
              <Route exact path="/newton" component={newton} />
              <Route exact path="/onepoint" component={onepoint} />
              <Route exact path="/secant" component={secant} />
              <Route exact path="/singletrap" component={singletrap} />
              <Route exact path="/diff" component={diff} />
              <Route exact path="/composittrap" component={composittrap} />
              <Route exact path="/simpson" component={simpson} />
              <Route exact path="/compossim" component={compossim} />
            </Switch>
          </BrowserRouter>

        </div>
      </React.Fragment>

    );
  }
}

export default App;

