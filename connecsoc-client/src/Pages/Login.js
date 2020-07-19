import React, { Component } from 'react'
import { FaAddressCard } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Typography, TextField, Grid, Button, CircularProgress } from '@material-ui/core'
import './pageStyles.css'

import { connect } from 'react-redux'
import { loginUser } from '../redux/actions/userActions'


export class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            errors: {}
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const userData = {
            email: this.state.email,
            password: this.state.password
        }

        this.props.loginUser(userData, this.props.history)

    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    static getDerivedStateFromProps(props, state) {
        if (props.UI.errors) {
            return {
                errors: props.UI.errors
            }
        }
    }

    render() {
        const {
            email,
            password,
            errors
        } = this.state

        const { UI: { loading } } = this.props

        return (
            <div>
                <Grid container className="form">
                    <Grid item sm />
                    <Grid item sm>
                        <div className="login">
                            <FaAddressCard size={50} />
                            <Typography variant="h1" class="title">
                                Login
                            </Typography>
                            <form noValidate onSubmit={this.handleSubmit}>
                                <TextField
                                    id="email text-field"
                                    name="email"
                                    type="email"
                                    label="Email"
                                    helperText={errors.email}
                                    error={errors.email ? true : false}
                                    fullWidth
                                    value={email}
                                    onChange={this.onChange}
                                />
                                <TextField
                                    id="password text-field"
                                    name="password"
                                    type="password"
                                    label="Password"
                                    helperText={errors.password}
                                    error={errors.password ? true : false}
                                    fullWidth
                                    value={password}
                                    onChange={this.onChange}
                                />
                                {
                                    errors.general && (
                                        <Typography variant="body2" id="error">
                                            {errors.general}
                                        </Typography>
                                    )
                                }
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    disabled={loading}
                                    id="button">
                                    Login
                                    {
                                        loading &&
                                        (<CircularProgress id="progress" size={30} />)
                                    }

                                </Button>
                                <br />
                                <small>
                                    Don't have an account? Sign up <Link to="/signup">here</Link>
                                </small>
                            </form>
                        </div>
                    </Grid>
                    <Grid item sm />
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps = {
    loginUser
}


export default connect(mapStateToProps, mapActionsToProps)(Login)
