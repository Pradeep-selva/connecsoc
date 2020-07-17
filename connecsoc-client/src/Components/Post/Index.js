import React from 'react'
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Tooltip,
    IconButton,
} from '@material-ui/core'
import { FaCommentDots } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import './Styles.css'

import { connect } from 'react-redux'

import LikeButton from '../LikeButton/Index'
import DeleteBtn from '../DeleteBtn/Index'
import ExpandPost from '../ExpandPost/Index'

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
        index,
        openPost
    } = props

    const { likeCount, commentCount } = props.posts[index]

    dayjs.extend(relativeTime)

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
                    <LikeButton id={id} />
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
                    <ExpandPost
                        postId={id}
                        openPost={openPost}
                        userHandle={handle}
                    />
                </CardContent>
            </Card>
        </div>
    )

}

const mapStateToProps = state => ({
    userHandle: state.user.credentials.handle,
    posts: state.data.posts
})

export default connect(mapStateToProps)(Post)