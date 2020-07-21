import React from 'react'
import { Link } from 'react-router-dom'

import {
    Tooltip,
    IconButton,
} from '@material-ui/core'
import { FaStar, FaRegStar } from 'react-icons/fa'

import { connect } from 'react-redux'
import { likePost, unlikePost } from '../../redux/actions/dataActions'
import { AppThunkAction, ReduxState } from '../../redux/store'
import { LikesType } from '../../redux/reducers/userReducers'

interface PassedProps {
    id: string
}

interface StateProps {
    authenticated: boolean,
    likes: Array<LikesType>
}

interface ActionProps {
    likePost: (postId: string) => AppThunkAction,
    unlikePost: (postId: string) => AppThunkAction
}

const LikeButton: React.FC<PassedProps & StateProps & ActionProps> = ({ id, authenticated, likes, likePost, unlikePost }) => {
    const isLiked = (likes: Array<LikesType>, postId: string) => {
        if (likes && likes.find(like => like.postId === postId)) {
            return true
        } else {
            return false
        }
    }

    let likeButton = !authenticated ? (
        <Tooltip title="You need to be logged in to like">
            <IconButton
                component={Link} to="/login">
                <FaRegStar
                    size={20}
                    style={{ color: "3ca4b0" }}
                />
            </IconButton>
        </Tooltip>
    ) : (
            isLiked(likes, id) ? (
                <Tooltip title="Unlike post">
                    <IconButton
                        onClick={() => unlikePost(id)}>
                        <FaStar
                            size={20}
                            style={{ color: "3ca4b0" }}
                        />
                    </IconButton>
                </Tooltip>
            ) : (
                    <Tooltip title="Like post">
                        <IconButton
                            onClick={() => likePost(id)}>
                            <FaRegStar
                                size={20}
                                style={{ color: "3ca4b0" }}
                            />
                        </IconButton>
                    </Tooltip>
                )
        )

    return likeButton;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
    authenticated: state.user.authenticated,
    likes: state.user.likes
})

const mapActionsToProps: ActionProps = {
    likePost,
    unlikePost
}

export default connect(mapStateToProps, mapActionsToProps)(LikeButton)