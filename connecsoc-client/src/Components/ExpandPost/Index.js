import React, { Fragment, useState, useEffect } from 'react'
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
import { usePaths } from '../../utils/customHooks'

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
    postId,
    openPost,
    userHandle
}) => {
    const [open, setOpen] = useState(false)
    const [paths, setPaths] = usePaths()

    const handleOpen = () => {
        let oldPath = window.location.pathname
        const newPath = `/users/${userHandle}/posts/${postId}`

        if (oldPath === newPath)
            oldPath = `users/${userHandle}`

        window.history.pushState(null, null, newPath)

        setPaths(oldPath, newPath)
        setOpen(true)
        getPost(postId)
    }

    const handleClose = () => {
        window.history.pushState(null, null, paths.oldPath)
        setOpen(false)
    }


    useEffect(() => {
        if (openPost) {
            handleOpen()
        }
    }, [])

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
                <Grid container>
                    <Grid item sm={5} xs={12}>
                        <img src={userImg} alt="profile" id="profile" />
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
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
            >
                <Tooltip
                    title="Close post"
                >
                    <IconButton
                        onClick={handleClose}
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