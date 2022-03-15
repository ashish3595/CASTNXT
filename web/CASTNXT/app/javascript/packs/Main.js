import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Homepage from '../components/Home/Homepage';

class Main extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            
        }
    }
    
    render() {
        return (
        <div className="App">
          <div style={{ "paddingTop": "2%" }}>
            <Router>
              <Switch>
                <Route exact path="/" render= {() => <Homepage />} />
                <Redirect from="/" to="/login" />
              </Switch>
            </Router>
          </div>
        </div>
      );
    }
}

export default Main;
