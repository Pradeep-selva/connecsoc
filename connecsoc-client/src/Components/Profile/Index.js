import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { FaCalendarAlt, FaSearchLocation, FaGlobe } from 'react-icons/fa'
import { Paper, Typography, Button } from '@material-ui/core'
import MuiLink from '@material-ui/core/Link'
import dayjs from 'dayjs'
import './Styles.css'

import { connect } from 'react-redux'

const Profile = (props) => {
    const {
        user: {
            credentials: {
                createdAt,
                imgUrl,
                bio,
                website,
                location,
                handle
            },
            loading,
            authenticated
        }
    } = props

    if (loading) {
        return <h2>Loading...</h2>
    }
    else {
        if (authenticated) {
            return (
                <Paper>
                    <div className="image">
                        <img src={imgUrl} alt="profile image" />
                    </div>
                    <hr />
                    <div className="profile">
                        <MuiLink
                            variant="h5"
                            color="primary"
                            component={Link} to={`/users/${handle}`}>
                            @{handle}
                        </MuiLink>
                        <br /><br />
                        {
                            bio &&
                            (
                                <Fragment>
                                    <Typography variant="body2">
                                        {bio}
                                    </Typography>
                                    <br />
                                </Fragment>
                            )
                        }
                        <hr />

                        <div className="data">
                            {
                                location &&
                                (
                                    <Fragment>
                                        <FaSearchLocation
                                            size={20}
                                            style={{ color: "52a178" }} />
                                        <span>
                                            {" "}{" "}{location}
                                        </span>
                                        <br />
                                    </Fragment>
                                )
                            }
                            {
                                website &&
                                (
                                    <Fragment>
                                        <FaGlobe
                                            size={20}
                                            style={{ color: "52a178" }} />
                                        <span>
                                            <a href={website} target="_blank" rel="noopener noreferrer">
                                                {' '}{website}
                                            </a>
                                        </span>
                                        <br />
                                    </Fragment>
                                )
                            }
                            <FaCalendarAlt
                                size={20}
                                style={{ color: "52a178" }} />
                            <span>
                                {" "}Joined {dayjs(createdAt).format('MMM YYYY')}
                            </span>
                        </div>
                    </div>
                </Paper >
            )
        } else {
            return (
                <Paper>
                    <div className="no-auth">
                        <Typography variant="h5">
                            You are not logged in!
                        </Typography>
                        <div className="buttons">
                            <Button
                                variant="contained"
                                color="primary"
                                component={Link} to='/login'>
                                Login
                        </Button>
                            {"   "}
                            <Button
                                variant="contained"
                                color="secondary"
                                component={Link} to='/signup'>
                                Signup
                        </Button>
                        </div>
                    </div>
                </Paper>
            )
        }
    }
}


const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(Profile)