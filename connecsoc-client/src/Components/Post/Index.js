import React from 'react'
import { Card, CardContent, CardMedia, Typography, Tooltip, IconButton, Button } from '@material-ui/core'
import { FaCommentDots, FaStar, FaRegStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import './Styles.css'

import { connect } from 'react-redux'
import { likePost, unlikePost } from '../../redux/actions/dataActions'

import DeleteBtn from '../DeleteBtn/Index'

const isLiked = (likes, postId) => {
    if (likes && likes.find(like => like.postId === postId)) {
        return true
    } else {
        return false
    }
}

const Post = (props) => {
    const {
        post: {
            id,
            handle,
            body,
            createdAt,
            userImg
        },
        userHandle,
        likes,
        authenticated,
        likePost,
        unlikePost,
        index
    } = props

    const { likeCount, commentCount } = props.posts[index]

    dayjs.extend(relativeTime)

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

    let deleteButton = userHandle === handle ? (
        <DeleteBtn
            id={id}
        />
    ) : null


    return (
        <div>
            <Card>
                <CardMedia
                    component="img"
                    image={userImg}
                    title="Profile picture" />
                <CardContent>
                    {deleteButton}
                    <Typography
                        color="primary"
                        variant="h5"
                        component={Link} to={`/users/${handle}`}>
                        {handle}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary">
                        {dayjs(createdAt).fromNow()}
                    </Typography>
                    <Typography variant="body1">
                        {body}
                    </Typography>
                    <hr />
                    {likeButton}
                    <span>
                        {likeCount} likes
                    </span>
                    <Tooltip title="Post comment">
                        <IconButton>
                            <FaCommentDots
                                size={20}
                                style={{ color: "3ca4b0" }}
                            />
                        </IconButton>
                    </Tooltip>
                    <span>
                        {commentCount} comments
                    </span>
                </CardContent>
            </Card>
        </div>
    )

}

const mapStateToProps = state => ({
    userHandle: state.user.credentials.handle,
    likes: state.user.likes,
    authenticated: state.user.authenticated,
    posts: state.data.posts
})

const mapActionsToProps = {
    likePost,
    unlikePost
}

export default connect(mapStateToProps, mapActionsToProps)(Post)