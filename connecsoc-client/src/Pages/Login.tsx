import React, { Component } from 'react'
import { FaAddressCard } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Typography, TextField, Grid, Button, CircularProgress } from '@material-ui/core'
import { History } from 'history'
import './pageStyles.css'

import { connect } from 'react-redux'
import { loginUser } from '../redux/actions/userActions'
import { UiType } from '../redux/reducers/uiReducer'
import { UserType } from '../redux/reducers/userReducers'
import { ReduxState } from '../redux/store'

interface UserDataType {
    email: string,
    password: string
}

interface State {
    email: string,
    password: string,
}

interface StateProps {
    UI: UiType,
    user: UserType,
    history?: any
}

interface ActionProps {
    loginUser: (userData: UserDataType, history: History) => any
}


class Login extends Component<StateProps & ActionProps, State> {

    constructor(props: StateProps & ActionProps) {
        super(props)

        this.state = {
            email: '',
            password: '',
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const userData: UserDataType = {
            email: this.state.email,
            password: this.state.password
        }

        this.props.loginUser(userData, this.props.history)

    }

    onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [event.target.name]: event.target.value
        } as Pick<State, keyof State>)
    }

    render() {
        const {
            email,
            password,
        } = this.state

        const { UI: { loading, errors } } = this.props

        return (
            <div>
                <Grid container className="form">
                    <Grid item sm />
                    <Grid item sm>
                        <div className="login">
                            <FaAddressCard size={50} />
                            <Typography variant="h1" id="title">
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

const mapStateToProps = (state: ReduxState): StateProps => ({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps: ActionProps = {
    loginUser
}


export default connect<StateProps, ActionProps, StateProps & ActionProps, ReduxState>(mapStateToProps, mapActionsToProps)(Login)
