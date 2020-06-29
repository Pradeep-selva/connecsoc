import React from 'react'
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import './Styles.css'

const Post = ({ post }) => {
    const {
        handle,
        body,
        createdAt,
        commentCount,
        likeCount,
        userImg
    } = post

    dayjs.extend(relativeTime)

    return (
        <div>
            <Card>
                <CardMedia
                    component="img"
                    image={userImg}
                    title="Profile picture" />
                <CardContent>
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
                </CardContent>
            </Card>
        </div>
    )

}


export default Post