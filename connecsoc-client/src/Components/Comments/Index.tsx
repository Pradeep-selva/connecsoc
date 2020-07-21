import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import AddComment from '../AddComment/Index'
import './Styles.css'

import { Typography, Grid } from '@material-ui/core'

import { CommentType } from '../../redux/reducers/dataReducers'

interface Props {
    comments: Array<CommentType>,
    postId: any
}

const Comments: React.FC<Props> = ({ comments, postId }) =>
    <Grid container id="comment-grid">
        <AddComment postId={postId} />
        {
            comments.map(comment => {
                const {
                    bio,
                    createdAt,
                    userHandle,
                    userImg
                } = comment

                return (
                    <Fragment key={createdAt}>
                        <Grid item sm={12}>
                            <div className="content">
                                <Grid container>
                                    <Grid item sm={3}>
                                        <img
                                            src={userImg}
                                            alt="profile"
                                            id="comment-profile"
                                        />
                                    </Grid>
                                    <Grid item sm={9}>
                                        <Typography
                                            variant="h6"
                                            color="primary"
                                            component={Link}
                                            to={`/user/${userHandle}`}
                                        >
                                            @{userHandle}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                        >
                                            {dayjs(createdAt).format('h:mm a, MMM DD YYYY')}
                                        </Typography>
                                        <hr id="invisible" />
                                        {bio}
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    </Fragment>
                )
            })
        }
    </Grid>

export default Comments
