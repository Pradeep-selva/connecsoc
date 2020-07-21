import React, { Fragment, useState, useEffect } from 'react'
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField
} from '@material-ui/core'
import './Styles.css'

import { connect } from 'react-redux'
import { editUser } from '../../redux/actions/userActions'
import { CredentialsType } from '../../redux/reducers/userReducers'
import { DetailsType } from '../../redux/actions/userActions'
import { AppThunkAction } from '../../redux/store'
import { ReduxState } from '../../redux/store'

import { useDetailForm } from '../../utils/customHooks'

interface StateProps {
    credentials: CredentialsType,
}

interface ActionProps {
    editUser: (userDetails: DetailsType) => AppThunkAction
}


const EditDetails: React.FC<StateProps & ActionProps> = ({ credentials, editUser }) => {

    const [open, setOpen] = useState(false)
    const { data, handleChange, mapData } = useDetailForm({
        bio: '',
        website: '',
        location: ''
    })

    const mapDetailsToProps = (credentials: CredentialsType) => {
        mapData({
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : ''
        })
    }

    const handleOpen = () => {
        setOpen(true)
        mapDetailsToProps(credentials)
    }

    const handleSubmit = () => {
        const userDetails = {
            bio: data.bio,
            website: data.website,
            location: data.location
        }

        editUser(userDetails)
        setOpen(false)
    }

    useEffect(() => {
        mapDetailsToProps(credentials)
    }, [])

    const {
        bio,
        website,
        location
    } = data

    return (
        <Fragment>
            <Button
                variant="contained"
                color="secondary"
                onClick={handleOpen}
                id="button"
            >
                Edit Details
                </Button>

            <Dialog
                maxWidth="sm"
                open={open}
                onClose={() => setOpen(false)}
                fullWidth
            >
                <DialogTitle>Edit your details</DialogTitle>

                <DialogContent>
                    <form>
                        <TextField
                            type="text"
                            value={bio}
                            name="bio"
                            label="Bio"
                            placeholder="Tell something interesting about you"
                            multiline
                            rows="3"
                            fullWidth
                            onChange={handleChange}
                        />
                        <TextField
                            type="text"
                            value={location}
                            name="location"
                            label="Location"
                            placeholder="Where do you live?"
                            fullWidth
                            onChange={handleChange}
                        />
                        <TextField
                            type="text"
                            value={website}
                            name="website"
                            label="Website"
                            placeholder="What's your website?"
                            fullWidth
                            onChange={handleChange}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="secondary"
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                        </Button>

                    <Button
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Save
                        </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}



const mapStateToProps = (state: ReduxState): StateProps => ({
    credentials: state.user.credentials
})

const mapActionsToProps: ActionProps = {
    editUser
}

export default connect(mapStateToProps, mapActionsToProps)(EditDetails)