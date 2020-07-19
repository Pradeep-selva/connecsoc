import React, { useState } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { FaCommentDots, FaStar } from 'react-icons/fa'
import './Styles.css'

import {
    Button,
    Typography,
    IconButton,
    Tooltip,
    Badge,
    Menu,
    MenuItem
} from '@material-ui/core'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { FaBell } from 'react-icons/fa'

import { connect } from 'react-redux'
import { markNotificationsRead } from '../../redux/actions/userActions'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#e0270b",
            contrastText: "#edf2f0"
        }
    }
})

const Notifications = ({ notifications, markNotificationsRead }) => {
    const [anchor, setAnchor] = useState(null)
    dayjs.extend(relativeTime)

    const handleOpen = (event) => {
        setAnchor(event.currentTarget)
    }

    const handleMarkRead = () => {
        const unreadNotifIds = notifications
            .filter(not => !not.read)
            .map(not => not.notificationId)
        markNotificationsRead(unreadNotifIds)
    }

    const handleClose = () => {
        setAnchor(null)
    }

    let notificationIcon;
    if (notifications && notifications.length > 0) {
        notifications.filter(not => not.read === false).length > 0 ? (
            notificationIcon = (
                <Badge
                    badgeContent={notifications.filter(not => not.read === false).length}
                    color="primary"
                >
                    <FaBell />
                </Badge>
            )
        ) : (
                notificationIcon = <FaBell />
            )
    } else {
        notificationIcon = <FaBell />
    }

    const notificationMarkup =
        notifications && notifications.length > 0 ? (
            notifications.map(not => {
                const verb = not.type === 'like' ? 'liked' : 'commented on';
                const time = dayjs(not.createdAt).fromNow();
                const iconColor = not.read ? '#52a178' : '#c23802';
                const icon = not.type === 'like' ? (
                    <FaStar style={{
                        color: `${iconColor}`,
                        marginRight: 10
                    }} />
                ) : (
                        <FaCommentDots style={{
                            color: `${iconColor}`,
                            marginRight: 10
                        }} />
                    )

                return (
                    <MenuItem onClick={handleClose}>
                        {icon}
                        <Typography
                            component={Link}
                            color="default"
                            variant="body1"
                            to={`/users/${not.recipient}/posts/${not.postId}`}
                        >
                            <Link
                                to={`/users/${not.sender}`}
                                id="sender"
                            >
                                @{not.sender}
                            </Link>
                            {' '}{verb} your post {time}
                        </Typography>
                    </MenuItem>
                )
            })
        ) : (
                <MenuItem onClick={handleClose}>
                    No notifications yet :)
            </MenuItem>
            )

    return (
        <MuiThemeProvider theme={theme}>
            <Tooltip
                title="Notifications"
            >
                <IconButton
                    color="inherit"
                    onClick={handleOpen}
                    aria-haspopup="true"
                >
                    {notificationIcon}
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchor}
                open={Boolean(anchor)}
                onClose={handleClose}
                getContentAnchorEl={null}
                onEntered={handleMarkRead}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                }}
            >
                {notificationMarkup}
            </Menu>
        </MuiThemeProvider>
    )
}

const mapStateToProps = state => ({
    notifications: state.user.notifications
})

const mapActionsToProps = {
    markNotificationsRead
}

export default connect(mapStateToProps, mapActionsToProps)(Notifications)