import React, { Fragment } from 'react'
import { AppBar, Toolbar, Button, Typography, IconButton } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import { FaConnectdevelop } from 'react-icons/fa'
import './Styles.css'

import { connect } from 'react-redux'
import { logoutUser } from '../../redux/actions/userActions'


const Navbar = (props) =>
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
                {
                    props.authenticated ? (
                        <Fragment>
                            <Button
                                color="inherit"
                                component={NavLink} to="/">
                                Home
                        </Button>
                            <Button
                                color="inherit"
                                onClick={props.logoutUser}
                            >
                                Logout
                        </Button>
                        </Fragment>
                    ) : (
                            <Fragment>
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
                            </Fragment>
                        )
                }
            </Toolbar>
        </AppBar>
    </div >


const mapStateToProps = state => ({
    authenticated: state.user.authenticated
})

const mapActionsToProps = {
    logoutUser
}

export default connect(mapStateToProps, mapActionsToProps)(Navbar)
