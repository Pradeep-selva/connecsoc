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
import { UiType } from '../../redux/reducers/uiReducer'
import { ReduxState } from '../../redux/store'

interface PassedProps extends React.Props<any> {
    postId: any
}

interface StateProps {
    UI: UiType,
    authenticated: boolean
}

interface ActionProps {
    commentOnPost: (postId: string, commentData: { body: string }) => any
}

const AddComment: React.FC<StateProps & ActionProps & PassedProps> = (props) => {
    const [body, setBody] = useState<string>('')

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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

    let addCommentMarkup = authenticated ? (
        <Grid item sm={12}>
            <form onSubmit={handleSubmit}>
                <TextField
                    name="body"
                    type="text"
                    value={body}
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

const mapStateToProps = (state: ReduxState): StateProps => ({
    UI: state.UI,
    authenticated: state.user.authenticated
})

const mapActionsToProps: ActionProps = {
    commentOnPost
}

export default connect<any, any, any, any>(mapStateToProps, mapActionsToProps)(AddComment)