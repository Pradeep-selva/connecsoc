import React, { Component, Fragment } from 'react'
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


class EditDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            bio: '',
            website: '',
            location: '',
            open: false
        }

        this.mapDetailsToProps = this.mapDetailsToProps.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    mapDetailsToProps = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : ''
        })
    }

    handleOpen = () => {
        this.setState({
            open: true
        })

        this.mapDetailsToProps(this.props.credentials)
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location
        }

        this.props.editUser(userDetails)
        this.handleClose()
    }

    componentDidMount() {
        const credentials = this.props.credentials
        this.mapDetailsToProps(credentials)
    }

    render() {
        const {
            bio,
            website,
            location,
            open
        } = this.state

        return (
            <Fragment>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={this.handleOpen}
                    id="button"
                >
                    Edit Details
                </Button>

                <Dialog
                    maxWidth="sm"
                    open={open}
                    onClose={this.handleClose}
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
                                onChange={this.handleChange}
                            />
                            <TextField
                                type="text"
                                value={location}
                                name="location"
                                label="Location"
                                placeholder="Where do you live?"
                                fullWidth
                                onChange={this.handleChange}
                            />
                            <TextField
                                type="text"
                                value={website}
                                name="website"
                                label="Website"
                                placeholder="What's your website?"
                                fullWidth
                                onChange={this.handleChange}
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            color="secondary"
                            onClick={this.handleClose}
                        >
                            Cancel
                        </Button>

                        <Button
                            color="primary"
                            onClick={this.handleSubmit}
                        >
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }

}

const mapStateToProps = state => ({
    credentials: state.user.credentials
})

const mapActionsToProps = {
    editUser
}

export default connect(mapStateToProps, mapActionsToProps)(EditDetails)