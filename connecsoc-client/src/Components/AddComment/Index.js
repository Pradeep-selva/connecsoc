import React, { Component } from 'react'
import './Styles.css'

import {
    Button,
    TextField,
    Grid,
    CircularProgress
} from '@material-ui/core'

import { connect } from 'react-redux'
import { commentOnPost } from '../../redux/actions/dataActions'

class AddComment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            body: '',
            errors: {}
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const {
            postId,
            commentOnPost
        } = this.props
        const commentData = {
            body: this.state.body
        }
        commentOnPost(postId, commentData)

        this.setState({
            body: '',
            errors: {}
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({
                errors: nextProps.UI.errors
            })
        }
    }

    render() {
        const {
            UI: {
                loading
            },
            authenticated
        } = this.props;

        const {
            body,
            errors
        } = this.state;

        let addCommentMarkup = authenticated ? (
            <Grid item sm={12}>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        name="body"
                        type="text"
                        value={body}
                        multiLine
                        rows="3"
                        fullWidth
                        label="Add comment"
                        error={errors && errors.comment}
                        helperText={errors && errors.comment}
                        onChange={this.handleChange}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        color="primary"
                        id="submit-button"
                    >
                        Submit
                        {
                            loading &&
                            (<CircularProgress id="progress" size={30} />)
                        }
                    </Button>
                </form>
            </Grid>
        ) : null;

        return addCommentMarkup;

    }
}

const mapStateToProps = state => ({
    UI: state.UI,
    authenticated: state.user.authenticated
})

const mapActionsToProps = {
    commentOnPost
}

export default connect(mapStateToProps, mapActionsToProps)(AddComment)