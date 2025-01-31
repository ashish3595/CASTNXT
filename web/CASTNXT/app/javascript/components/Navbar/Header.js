import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      marginRight: theme.spacing(2),
    },
  }));

export default function Header(props) {
    const classes = useStyles();

    return (
        <div className="header">
            <header>
                <AppBar className="appbar" style={{background: 'black'}}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            {/* <MenuIcon /> */}
                            <img src={require('../../assets/images/logo.png')} alt="FASHIONXT" style={{ width: '14vw', height: '3.5vh' }} />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}></Typography>
                        <Typography color="inherit" style={{marginRight: '1%'}}>Welcome, {props.firstName}</Typography>
                    </Toolbar>
                </AppBar>
            </header>
        </div>
    )
}
