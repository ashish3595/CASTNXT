import React, {Component} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios';

class LandingPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",
            role: "",
            tabValue: 0,
            redirect: false
        }
    }

    handleTabChange = (event, value) => {
        this.setState({
            tabValue: value
        })
    }

    handleChange = (e, value) => {
        console.log(e.target.name, value)
        this.setState({
            [e.target.name]: value
        })
    }

    signUp = () => {

    }

    login = () => {
        console.log("Here")
        // this.setState({
        //     redirect: !this.state.redirect
        // })
        axios.get("/?email=test@test.com&password=password")
        .then((res) => {
            console.log("Success")
        })
        .catch(() => {
            console.log("Failure")
        })
    }

    render() {

        if(this.state.redirect) {
            return <Redirect to='/user'/>;
        }

        return (
            <div>
                <div className="container">
                    <div className="row" style={{ color: 'white' }}>
                        <div className="col-md-6 offset-md-3 login-box">
                            <div>
                                <Tabs variant="fullWidth" value={this.state.tabValue} onChange={this.handleTabChange} centered>
                                    <Tab label="Login" />
                                    <Tab label="Sign Up" />
                                </Tabs>
                                <hr style={{ color: 'black' }} />
                            </div>

                            {this.state.tabValue === 0 &&
                                <div className="login-background" style={{textAlign: 'center'}}>
                                    <TextField focused style={{ width: '60%' }} name="email" label="Email" value={this.state.email} onChange={this.handleChange} /><br /><br />
                                    <TextField focused style={{ width: '60%' }} name="password" label="Password" value={this.state.password} onChange={this.handleChange} /><br /><br />
                                    <Button variant="contained" onClick={this.login}>Login</Button>
                                </div>
                            }

                            {this.state.tabValue === 1 &&
                                <div className="login-background">
                                    <FormControl style={{ textAlign: 'center', color: 'black' }}>
                                        <FormLabel>Welcome to CastNXT! Please select your role</FormLabel>
                                        <div>
                                            <RadioGroup
                                                row
                                                name="role"
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                defaultValue="talent"
                                                onChange={this.handleChange}
                                            >
                                                <FormControlLabel value="talent" control={<Radio />} label="Talent" />
                                                <FormControlLabel value="eventManager" control={<Radio />} label="Event Manager" />
                                                <FormControlLabel value="designer" control={<Radio />} label="Designer" />
                                            </RadioGroup>
                                        </div>
                                        <br />
                                        <TextField focused name="name" label="Name" value={this.state.name} onChange={this.handleChange} /><br /><br />
                                        <TextField focused name="email" label="Email" value={this.state.email} onChange={this.handleChange} /><br /><br />
                                        <TextField focused name="password" label="Password" value={this.state.password} onChange={this.handleChange} /><br /><br />
                                    </FormControl>
                                    <br />
                                    <Button className="sign-up-button" size="medium" variant="contained" onClick={this.signUp}>Sign Up</Button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}

export default LandingPage