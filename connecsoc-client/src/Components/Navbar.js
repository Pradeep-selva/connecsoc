import React, { Component } from 'react'
import { AppBar, Toolbar, Button } from '@material-ui/core'
import { NavLink } from 'react-router-dom'

export class Navbar extends Component {
    render() {
        return (
            <div>
                <AppBar>
                    <Toolbar>
                        <Button color="inherit" component={NavLink} to="/">
                            Home
                        </Button>
                        <Button color="inherit" component={NavLink} to="/login">
                            Login
                        </Button>
                        <Button color="inherit" component={NavLink} to="/signup">
                            Signup
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default Navbar
