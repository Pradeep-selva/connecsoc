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
import { UiType } from '../../redux/reducers/uiReducer'
import { ReduxState } from '../../redux/store'
import { AppThunkAction } from '../../redux/store'

interface StateType {
    body: string,
    errors: any,
    open: boolean
}

interface StateProps {
    UI: UiType
}

interface ActionProps {
    addPost: (postData: { body: string }) => AppThunkAction
}


class AddPost extends Component<StateProps & ActionProps, StateType> {
    constructor(props: Readonly<StateProps & ActionProps>) {
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
            errors: {},
            body: ''
        })
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [event.target.name]: event.target.value
        } as unknown as Pick<StateType, keyof StateType>)
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
                                error={errors && errors.body}
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

const mapStateToProps = (state: ReduxState): StateProps => ({
    UI: state.UI
})

const mapActionsToProps: ActionProps = {
    addPost
}

export default connect(mapStateToProps, mapActionsToProps)(AddPost)