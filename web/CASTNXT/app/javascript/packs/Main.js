import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Homepage from '../components/Home/Homepage';
import UserHomepage from '../components/User/UserHomepage';
import AdminHomepage from '../components/Admin/AdminHomepage';
import ClientHomepage from '../components/Client/ClientHomepage';

class Main extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            
        }
    }
    
    render() {
        return (
        <div className="App">
          <div className="overflow-auto" style={{ "paddingTop": "1%" }}>
            <Router>
              <Switch>
                <Route exact path="/" render= {() => <Homepage />} />
                <Route exact path="/user" render= {() => <UserHomepage />} />
                <Route exact path="/admin" render= {() => <AdminHomepage />} />
                <Route exact path="/client" render= {() => <ClientHomepage />} />
                <Redirect from="/" to="/login" />
              </Switch>
            </Router>
          </div>
        </div>
      );
    }
}

export default Main;
