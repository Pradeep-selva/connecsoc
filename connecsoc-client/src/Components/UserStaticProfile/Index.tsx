import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import UserSkeleton from '../../utils/skeletons/UserSkeleton'
import './Styles.css'

import { FaCalendarAlt, FaSearchLocation, FaGlobe } from 'react-icons/fa'
import { Paper, Typography } from '@material-ui/core'
import MuiLink from '@material-ui/core/Link'

interface Props {
    profile: any,
    loading: boolean
}


const UserStaticProfile: React.FC<Props> = (props) => {
    const {
        profile: {
            createdAt,
            imgUrl,
            bio,
            website,
            location,
            handle
        },
        loading
    } = props

    if (loading) {
        return <UserSkeleton />
    }
    else {
        return (
            <Paper>
                <div className="image-wrapper">
                    <img src={imgUrl} alt="profile" className="image" />
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
    }
}

export default UserStaticProfile;