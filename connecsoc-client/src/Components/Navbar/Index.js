import React, { Fragment } from 'react'
import {
    AppBar,
    Toolbar,
    Button,
    Typography,
    IconButton,
    Tooltip
} from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import {
    FaConnectdevelop,
    FaHome,
} from 'react-icons/fa'
import './Styles.css'
import Logout from '../Logout/Index'
import AddPost from '../AddPost/Index'
import Notifications from '../Notifications/Index'

import { connect } from 'react-redux'


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
                            <div style={{ flexGrow: 1 }}>
                                <AddPost />
                                <Tooltip
                                    title="Home"
                                >
                                    <IconButton
                                        color="inherit"
                                        component={NavLink} to="/"
                                    >
                                        <FaHome />
                                    </IconButton>
                                </Tooltip>
                                <Notifications />
                            </div>
                            <Logout />
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

export default connect(mapStateToProps)(Navbar)
