import React, { useState } from 'react'
import './Styles.css'

import {
    Button,
    TextField,
    Grid,
    CircularProgress
} from '@material-ui/core'

import { connect } from 'react-redux'
import { commentOnPost } from '../../redux/actions/dataActions'

const AddComment = (props) => {
    const [body, setBody] = useState('')

    handleSubmit(event) {
        event.preventDefault();

        const {
            postId,
            commentOnPost
        } = props
        const commentData = {
            body
        }
        commentOnPost(postId, commentData)

        setBody('')
    }


    const {
        UI: {
            loading,
            errors
        },
        authenticated
    } = props;

    const {
        body
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
                    onChange={(event) => setBody(event.target.value)}
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

const mapStateToProps = state => ({
    UI: state.UI,
    authenticated: state.user.authenticated
})

const mapActionsToProps = {
    commentOnPost
}

export default connect(mapStateToProps, mapActionsToProps)(AddComment)