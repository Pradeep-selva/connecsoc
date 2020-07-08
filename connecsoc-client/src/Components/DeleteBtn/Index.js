import React, { Component, Fragment } from 'react'
import './Styles.css'

import {
    Dialog,
    DialogTitle,
    DialogActions,
    IconButton,
    Button,
    Tooltip
} from '@material-ui/core'
import { FaRegTrashAlt } from 'react-icons/fa'

import { connect } from 'react-redux'
import { deletePost } from '../../redux/actions/dataActions'

class DeleteBtn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        }

        this.handleOpen = this.handleOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
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

    handleDelete() {
        console.log("initiating delete")
        this.props.deletePost(this.props.id)

        this.setState({
            open: false
        })
    }

    render() {
        return (
            <Fragment>
                <Tooltip
                    title="Delete Post"
                >
                    <IconButton
                        onClick={this.handleOpen}
                        id="delete"
                    >
                        <FaRegTrashAlt style={{ color: '#d10a0a' }} />
                    </IconButton>
                </Tooltip>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle>
                        Are you sure you want to delete this post? This action is irreversible.
                    </DialogTitle>

                    <DialogActions>
                        <Button
                            onClick={this.handleClose}
                            style={{ color: '#d10a0a' }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={this.handleDelete}
                            color="primary"
                        >
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

export default connect(null, { deletePost })(DeleteBtn);