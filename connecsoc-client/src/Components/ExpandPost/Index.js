import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import './Styles.css'

import {
    Tooltip,
    IconButton,
    Dialog,
    DialogContent,
    Typography,
    Grid,
    CircularProgress
} from '@material-ui/core'
import { FaExpandAlt, FaRegWindowClose, FaCommentDots } from 'react-icons/fa'

import { connect } from 'react-redux'
import { getPost } from '../../redux/actions/dataActions'

import LikeButton from '../LikeButton/Index'
import Comments from '../Comments/Index'

const ExpandPost = ({
    post: {
        id,
        createdAt,
        handle,
        likeCount,
        body,
        commentCount,
        userImg,
        comments
    },
    loading,
    getPost,
    postId
}) => {

    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
        getPost(postId)
    }

    let dialogContent = loading ? (
        <Fragment>
            <CircularProgress size={150} color="primary" id="progress" />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        </Fragment>
    ) : (
            <Fragment>
                <Grid container spacing={16}>
                    <Grid item sm={5} xs={12}>
                        <img src={userImg} alt="profile picture" id="profile" />
                    </Grid>

                    <Grid item sm={7} xs={12}>
                        <Typography
                            variant="h5"
                            component={Link}
                            to={`/user/${handle}`}
                            color="primary"
                        >
                            @{handle}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                        >
                            {dayjs(createdAt).format('h:mm a, MMM DD YYYY')}
                        </Typography>
                        <hr />
                        {body}
                        <br />
                        <br />
                        <LikeButton id={id} />
                        <span>{likeCount} likes</span>
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
                    </Grid>
                </Grid>
                <br />
                <Typography
                    variant="h6"
                    color="primary">
                    Comments
                    </Typography>
                <Comments comments={comments} postId={id} />
            </Fragment>
        )

    return (
        <Fragment>
            <div className="expand-button">
                <Tooltip
                    title="Expland post"
                >
                    <IconButton
                        onClick={handleOpen}
                    >
                        <FaExpandAlt style={{ color: "#3ca4b0" }} size={20} />
                    </IconButton>
                </Tooltip>
            </div>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                fullWidth
                maxWidth="sm"
            >
                <Tooltip
                    title="Close post"
                >
                    <IconButton
                        onClick={() => setOpen(false)}
                    >
                        <FaRegWindowClose
                            style={{ color: "#d10a0a" }}
                            size={20}
                            className="close-button"
                        />
                    </IconButton>
                </Tooltip>
                <DialogContent>
                    <div className="dialog-content">
                        {dialogContent}
                    </div>
                </DialogContent>
            </Dialog>
        </Fragment>
    )
}


const mapStateToProps = state => ({
    loading: state.UI.loading,
    post: state.data.post
})

const mapActionsToProps = {
    getPost
}

export default connect(mapStateToProps, mapActionsToProps)(ExpandPost)