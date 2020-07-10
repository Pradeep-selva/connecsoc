import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import './Styles.css'

import { Typography, Grid } from '@material-ui/core'

const Comments = ({ comments }) =>
    <Grid container spacing={12}>
        {
            comments.map((comment, index) => {
                const {
                    bio,
                    createdAt,
                    userHandle,
                    userImg
                } = comment
                console.log(comments.length)

                return (
                    <Fragment key={createdAt}>
                        <Grid item sm={12}>
                            <div className="content">
                                <Grid container>
                                    <Grid item sm={3}>
                                        <img
                                            src={userImg}
                                            alt="profile picture"
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
