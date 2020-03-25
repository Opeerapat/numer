import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import home from './page/home';
import bisec from './page/bisec';
import falseposit from './page/falseposit';
import conjugate from './page/conjugate';
import cramer from './page/cramer';
import gausseli from './page/gausseli';
import gaussjordan from './page/gaussjordan';
import gaussseiden from './page/gaussseidel';
import jacobi from './page/jacobi';
import lagrange from './page/lagrange';
import lu from './page/lu';
import newton from './page/newton';
import newtondi from './page/newtondi';
import onepoint from './page/onepoint';
import secant from './page/secant';
import spline from './page/spline';
import Navbar from './component/Navbar';
import singletrap from './page/singletrap';
import composittrap from './page/composittrap';
import { Jumbotron } from './component/Jumbotron';
import diff from './page/diff';
import simpson from './page/simpson';
import compossim from './page/compossim'
import a1 from './asset/a5.png'

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
              <Route exact path="/conjugate" component={conjugate} />
              <Route exact path="/cramer" component={cramer} />
              <Route exact path="/gausseli" component={gausseli} />
              <Route exact path="/gaussjordan" component={gaussjordan} />
              <Route exact path="/gaussseiden" component={gaussseiden} />
              <Route exact path="/jacobi" component={jacobi} />
              <Route exact path="/lagrange" component={lagrange} />
              <Route exact path="/lu" component={lu} />
              <Route exact path="/newton" component={newton} />
              <Route exact path="/newtondi" component={newtondi} />
              <Route exact path="/onepoint" component={onepoint} />
              <Route exact path="/secant" component={secant} />
              <Route exact path="/spline" component={spline} />
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

