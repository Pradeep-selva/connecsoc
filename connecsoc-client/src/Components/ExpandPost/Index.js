import React, { Component, Fragment } from 'react'
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

class ExpandPost extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false
        }

        this.handleOpen = this.handleOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    handleOpen() {
        this.setState({
            open: true
        })

        this.props.getPost(this.props.postId)
    }

    handleClose() {
        this.setState({
            open: false
        })
    }

    render() {
        const { open } = this.state
        const {
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
            loading
        } = this.props

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
                    <Comments comments={comments} />
                </Fragment>
            )

        return (
            <Fragment>
                <div className="expand-button">
                    <Tooltip
                        title="Expland post"
                    >
                        <IconButton
                            onClick={this.handleOpen}
                        >
                            <FaExpandAlt style={{ color: "#3ca4b0" }} size={20} />
                        </IconButton>
                    </Tooltip>
                </div>

                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <div className="close-button">
                        <Tooltip
                            title="Close post"
                        >
                            <IconButton
                                onClick={this.handleClose}
                            >
                                <FaRegWindowClose style={{ color: "#d10a0a" }} size={20} />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <DialogContent>
                        <div className="dialog-content">
                            {dialogContent}
                        </div>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.UI.loading,
    post: state.data.post
})

const mapActionsToProps = {
    getPost
}

export default connect(mapStateToProps, mapActionsToProps)(ExpandPost)