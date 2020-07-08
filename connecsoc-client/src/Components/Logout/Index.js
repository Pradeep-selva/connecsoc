import React, { Component, Fragment } from 'react'

import {
    Dialog,
    DialogTitle,
    DialogActions,
    Button,
} from '@material-ui/core'

import { connect } from 'react-redux'
import { logoutUser } from '../../redux/actions/userActions'

class Logout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        }

        this.handleOpen = this.handleOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
    }

    handleOpen() {
        this.setState({
            open: true
        })
    }

    handleClose() {
        this.setState({
            open: false
        })
    }

    handleLogout() {
        this.props.logoutUser()

        this.setState({
            open: false
        })
    }

    render() {
        return (
            <Fragment>
                <Button
                    color="inherit"
                    onClick={this.handleOpen}
                >
                    Logout
                        </Button>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle>
                        Are you sure you want to logout?
                    </DialogTitle>

                    <DialogActions>
                        <Button
                            onClick={this.handleClose}
                            color="secondary"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={this.handleLogout}
                            color="primary"
                        >
                            Logout
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

export default connect(null, { logoutUser })(Logout);