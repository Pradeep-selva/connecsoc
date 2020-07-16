import React, { Fragment, useState } from 'react'
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

const DeleteBtn = ({ deletePost, id }) => {
    const [open, setOpen] = useState(false)

    const handleDelete = () => {
        console.log("initiating delete")
        deletePost(id)

        setOpen(true)
    }

    return (
        <Fragment>
            <Tooltip
                title="Delete Post"
            >
                <IconButton
                    onClick={() => setOpen(true)}
                    id="delete"
                >
                    <FaRegTrashAlt style={{ color: '#d10a0a' }} />
                </IconButton>
            </Tooltip>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>
                    Are you sure you want to delete this post? This action is irreversible.
                    </DialogTitle>

                <DialogActions>
                    <Button
                        onClick={() => setOpen(false)}
                        style={{ color: '#d10a0a' }}
                    >
                        Cancel
                        </Button>
                    <Button
                        onClick={handleDelete}
                        color="primary"
                    >
                        Confirm
                        </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default connect(null, { deletePost })(DeleteBtn);