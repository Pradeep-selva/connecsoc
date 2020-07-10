import React from 'react'
import { Link } from 'react-router-dom'

import {
    Tooltip,
    IconButton,
} from '@material-ui/core'
import { FaStar, FaRegStar } from 'react-icons/fa'

import { connect } from 'react-redux'
import { likePost, unlikePost } from '../../redux/actions/dataActions'


const LikeButton = ({ id, authenticated, likes, likePost, unlikePost }) => {
    const isLiked = (likes, postId) => {
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

const mapStateToProps = state => ({
    authenticated: state.user.authenticated,
    likes: state.user.likes
})

const mapActionsToProps = {
    likePost,
    unlikePost
}

export default connect(mapStateToProps, mapActionsToProps)(LikeButton)