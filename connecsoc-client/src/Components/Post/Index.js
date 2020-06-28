import React from 'react'
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import './Styles.css'

const Post = ({ post }) => {
    const {
        postId,
        handle,
        body,
        createdAt,
        commentCount,
        likeCount,
        userImg
    } = post

    return (
        <div>
            <Card>
                <CardMedia
                    component="img" i
                    mage={userImg} t
                    itle="Profile picture" />
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
                        {createdAt.substring(0, 10)}
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