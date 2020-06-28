import React from 'react'
import { AppBar, Toolbar, Button, Typography, IconButton } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import { FaConnectdevelop } from 'react-icons/fa'
import './Styles.css'

const Navbar = () =>
    <div>
        <AppBar>
            <Toolbar>
                <IconButton
                    color="inherit"
                    component={NavLink} to="/">
                    <FaConnectdevelop size={50} />
                </IconButton>
                <Typography
                    id="brand"
                    color="inherit"
                    edge="start"
                    variant="h3"
                    style={{ flexGrow: 1 }}>
                    Connecsoc
                        </Typography>
                <Button
                    color="inherit"
                    component={NavLink} to="/">
                    Home
                        </Button>
                <Button
                    color="inherit"
                    component={NavLink} to="/login">
                    Login
                        </Button>
                <Button
                    color="inherit"
                    component={NavLink} to="/signup">
                    Signup
                        </Button>
            </Toolbar>
        </AppBar>
    </div>


export default Navbar
