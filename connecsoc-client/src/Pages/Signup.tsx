import React from 'react'
import { FiUserPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Typography, TextField, Grid, Button, CircularProgress } from '@material-ui/core'
import { useSignupForm } from '../utils/customHooks'
import { History } from 'history'
import './pageStyles.css'

import { connect } from 'react-redux'
import { signupUser } from '../redux/actions/userActions'
import { UiType } from '../redux/reducers/uiReducer'
import { UserType } from '../redux/reducers/userReducers'
import { ReduxState } from '../redux/store'

interface UserDataType {
    email: string,
    password: string,
    confirmPassword: string,
    handle: string
}

interface StateProps {
    user: UserType,
    UI: UiType,
    history?: any
}

interface ActionProps {
    signupUser: (userData: UserDataType, history: History) => any
}


const Signup: React.FC<StateProps & ActionProps> = (props) => {
    const { state, handleChange } = useSignupForm({
        email: '',
        password: '',
        confirmPassword: '',
        handle: '',
    })

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const userData = {
            email: state.email,
            password: state.password,
            confirmPassword: state.confirmPassword,
            handle: state.handle
        }

        props.signupUser(userData, props.history)
    }

    const {
        email,
        password,
        confirmPassword,
        handle,
    } = state

    const { UI: { loading, errors } } = props

    return (
        <div>
            <Grid container className="form">
                <Grid item sm />
                <Grid item sm>
                    <div className="login">
                        <FiUserPlus size={50} />
                        <Typography variant="h1" id="title">
                            Signup
                            </Typography>
                        <form noValidate onSubmit={handleSubmit}>
                            <TextField
                                id="handle text-field"
                                name="handle"
                                type="text"
                                label="Handle"
                                helperText={errors.handle}
                                error={errors.handle ? true : false}
                                fullWidth
                                value={handle}
                                onChange={handleChange}
                            />
                            <TextField
                                id="email text-field"
                                name="email"
                                type="email"
                                label="Email"
                                helperText={errors.email}
                                error={errors.email ? true : false}
                                fullWidth
                                value={email}
                                onChange={handleChange}
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
                                onChange={handleChange}
                            />
                            <TextField
                                id="confirmPassword text-field"
                                name="confirmPassword"
                                type="password"
                                label="Confirm Password"
                                helperText={errors.confirmPassword}
                                error={errors.confirmPassword ? true : false}
                                fullWidth
                                value={confirmPassword}
                                onChange={handleChange}
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
                                Signup
                                    {
                                    loading &&
                                    (<CircularProgress id="progress" size={30} />)
                                }

                            </Button>
                            <br />
                            <small>
                                Already have an account? Login <Link to="/login">here</Link>
                            </small>
                        </form>
                    </div>
                </Grid>
                <Grid item sm />
            </Grid>
        </div>
    )
}


const mapStateToProps = (state: ReduxState): StateProps => ({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps: ActionProps = {
    signupUser
}

export default connect(mapStateToProps, mapActionsToProps)(Signup)
