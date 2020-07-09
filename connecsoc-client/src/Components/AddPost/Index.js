import React, { Component, Fragment } from 'react'
import {
    IconButton,
    Tooltip,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    CircularProgress
} from '@material-ui/core'
import { FaPlusCircle } from 'react-icons/fa'

import { connect } from 'react-redux'
import { addPost } from '../../redux/actions/dataActions'


class AddPost extends Component {
    constructor(props) {
        super(props)

        this.state = {
            body: '',
            errors: {},
            open: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleOpen = () => {
        this.setState({
            open: true
        })
    }

    handleClose = () => {
        this.setState({
            open: false,
            errors: {}
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = () => {
        if (this.state.body.trim() === '') {
            this.setState({
                errors: {
                    body: "Post cannot be empty"
                }
            })
        } else {
            const postData = {
                body: this.state.body
            }

            this.props.addPost(postData)
            this.handleClose()
        }
    }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.UI.errors !== this.state.errors) {
    //         this.setState({
    //             errors: nextProps.UI.errors
    //         })
    //     }
    // }

    render() {
        const { open, errors } = this.state
        const { UI: { loading } } = this.props

        return (
            <Fragment>
                <Tooltip
                    title="Add post"
                >
                    <IconButton
                        color="inherit"
                        onClick={this.handleOpen}
                    >
                        <FaPlusCircle />
                    </IconButton>
                </Tooltip>

                <Dialog
                    maxWidth="sm"
                    open={open}
                    onClose={this.handleClose}
                    fullWidth
                >
                    <DialogTitle>Add a new post!</DialogTitle>

                    <DialogContent>
                        <form>
                            <TextField
                                type="text"
                                name="body"
                                label="Content"
                                placeholder="What do you want to share today?"
                                multiline
                                rows="3"
                                fullWidth
                                errors={errors && errors.body}
                                helperText={errors.body}
                                onChange={this.handleChange}
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={this.handleClose}
                        >
                            Cancel
                        </Button>

                        <Button
                            color="primary"
                            variant="contained"
                            disabled={loading}
                            onClick={this.handleSubmit}
                        >
                            Post
                            {
                                loading &&
                                (<CircularProgress id="progress" size={30} />)
                            }
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }

}

const mapStateToProps = state => ({
    UI: state.UI
})

const mapActionsToProps = {
    addPost
}

export default connect(mapStateToProps, mapActionsToProps)(AddPost)