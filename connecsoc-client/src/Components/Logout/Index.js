import React, { Fragment, useState } from 'react'

import {
    Dialog,
    DialogTitle,
    DialogActions,
    Button,
} from '@material-ui/core'

import { connect } from 'react-redux'
import { logoutUser } from '../../redux/actions/userActions'

const Logout = ({ logoutUser }) => {
    const [open, setOpen] = useState(false)

    const handleLogout = () => {
        logoutUser()
        setOpen(false)
    }


    return (
        <Fragment>
            <Button
                color="inherit"
                onClick={() => setOpen(true)}
            >
                Logout
            </Button>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>
                    Are you sure you want to logout?
                    </DialogTitle>

                <DialogActions>
                    <Button
                        onClick={() => setOpen(false)}
                        color="secondary"
                    >
                        Cancel
                        </Button>
                    <Button
                        onClick={handleLogout}
                        color="primary"
                    >
                        Logout
                        </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default connect(null, { logoutUser })(Logout);