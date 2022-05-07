import React, {Component} from 'react'
import { Redirect } from 'react-router-dom';
import Header from '../Navbar/Header';
import Form from '@rjsf/core';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Alert from '@mui/material/Alert';
import axios from 'axios';

class AdminEventHome extends Component {
    constructor(props) {
        super(props)

        this.state = {
            properties: props.properties,
            eventStatus: props.properties.data.status,
            message: "",
            status: "",
            statusCounter: 0
        }
    }
    
    handleChange = (e) => {
      const baseURL = window.location.href.split('#')[0]
      
      axios.put(baseURL, {
        status: e.target.value
      })
      .then((res) => {
        this.setState({
          status: true,
          eventStatus: e.target.value,
          message: res.data.comment
        })
      })
      .catch((err) => {
        this.setState({
          status: false,
          message: "Failed to update Event Status!"
        })
        
        if(err.response.status === 403) {
          window.location.href = err.response.data.redirect_path
        }
      })
      .finally(()=> {
        this.setState({
          statusCounter: this.state.statusCounter + 1
        })
        
        setTimeout(() => {
          if (this.state.statusCounter == 1) {
            this.setState({
              status: ""
            })
          } else {
            this.setState({
              statusCounter: this.state.statusCounter - 1
            })
          }
        }, 2500)
      })
    }

    render() {
        
        return(
            <div>

                <div style={{marginTop: '1%'}}>
                    <p>Use this page to update an event.</p>
                    
                    <div>
                      <div className="col-md-8 offset-md-2">
                        <ToggleButtonGroup
                          color="success"
                          value={this.state.eventStatus}
                          exclusive
                          onChange={this.handleChange}
                        >
                          <ToggleButton value="ACCEPTING">ACCEPTING</ToggleButton>
                          <ToggleButton value="REVIEWING">REVIEWING</ToggleButton>
                          <ToggleButton value="FINALIZED">FINALIZED</ToggleButton>
                        </ToggleButtonGroup>
                      </div>
                        
                      {(this.state.status !== "" && this.state.status) && 
                          <div className="col-md-6 offset-md-3">
                            <br />
                            <Alert severity="success">{this.state.message}</Alert>
                            <br />
                          </div>
                      }
                      
                      {(this.state.status !== "" && !this.state.status) &&
                          <div className="col-md-6 offset-md-3">
                            <br />
                            <Alert severity="error">Error: {this.state.message}</Alert>
                            <br />
                          </div>
                      }
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminEventHome