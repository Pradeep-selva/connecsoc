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
import { ReduxState } from '../../redux/store'

interface Props {
    authenticated: boolean
}


const Navbar: React.FC<Props> = (props) =>
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


const mapStateToProps = (state: ReduxState): Props => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(Navbar)
