import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { FaCalendarAlt, FaSearchLocation, FaGlobe } from 'react-icons/fa'
import { MdModeEdit } from 'react-icons/md'
import { Paper, Typography, Button, IconButton, Tooltip } from '@material-ui/core'
import MuiLink from '@material-ui/core/Link'
import dayjs from 'dayjs'
import EditDetails from '../EditDetails/Index'
import UserSkeleton from '../../utils/skeletons/UserSkeleton'
import './Styles.css'

import { connect } from 'react-redux'
import { uploadImage } from '../../redux/actions/userActions'
import { UserType } from '../../redux/reducers/userReducers'
import { ReduxState, AppThunkAction } from '../../redux/store'

interface StateProps {
    user: UserType
}

interface ActionProps {
    uploadImage: (formData: any) => AppThunkAction
}


const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, uploadImage: (formData: any) => AppThunkAction) => {

    const image = event.target && event.target.files![0]
    const formData = new FormData()

    formData.append('image', image, image.name)
    uploadImage(formData)
}

const Profile: React.FC<StateProps & ActionProps> = (props) => {
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
        },
        uploadImage
    } = props


    const handleClick = () => {
        const imageUpload: any = document.getElementById("inputFile")
        imageUpload.click()
    }

    if (loading) {
        return <UserSkeleton />
    }
    else {
        if (authenticated) {
            return (
                <Paper>
                    <div className="image-wrapper">
                        <img src={imgUrl} alt="profile" className="image" />
                    </div>
                    <input
                        type="file"
                        id="inputFile"
                        hidden={true}
                        onChange={(event) => handleImageChange(event, uploadImage)}
                    />
                    <div className="img-edit">
                        <Tooltip
                            title="Edit profile picture"
                        >
                            <IconButton onClick={handleClick}>
                                <MdModeEdit size={30} style={{ color: "52a178" }} />
                            </IconButton>
                        </Tooltip>
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
                        <EditDetails />
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


const mapStateToProps = (state: ReduxState): StateProps => ({
    user: state.user
})

const mapActionsToProps: ActionProps = {
    uploadImage
}

export default connect(mapStateToProps, mapActionsToProps)(Profile)