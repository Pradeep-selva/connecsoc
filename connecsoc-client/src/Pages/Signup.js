import React, { Component } from 'react'
import { FiUserPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Typography, TextField, Grid, Button, CircularProgress } from '@material-ui/core'
import axios from 'axios'
import './pageStyles.css'


export class Signup extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            errors: {},
            loading: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    handleSubmit = (event) => {
        event.preventDefault()
        console.log("submitted login form")

        this.setState({
            loading: true
        })
        const userData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }

        axios.post('/signup', userData)
            .then(res => {
                console.log(res.data)
                this.setState({
                    loading: false,
                    errors: {}
                })
                localStorage.setItem('AuthToken', `Bearer ${res.data.token}`)
                this.props.history.push('/')
            })
            .catch(err => {
                console.log(err.response.data)
                this.setState({
                    loading: false,
                    errors: err.response.data
                })
            })
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const {
            email,
            password,
            confirmPassword,
            handle,
            loading,
            errors
        } = this.state
        return (
            <div>
                <Grid container className="form">
                    <Grid item sm />
                    <Grid item sm>
                        <div className="login">
                            <FiUserPlus size={50} />
                            <Typography variant="h1" class="title">
                                Signup
                            </Typography>
                            <form noValidate onSubmit={this.handleSubmit}>
                                <TextField
                                    id="handle text-field"
                                    name="handle"
                                    type="text"
                                    label="Handle"
                                    helperText={errors.handle}
                                    error={errors.handle ? true : false}
                                    fullWidth
                                    value={handle}
                                    onChange={this.onChange}
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
                                <TextField
                                    id="confirmPassword text-field"
                                    name="confirmPassword"
                                    type="password"
                                    label="Confirm Password"
                                    helperText={errors.confirmPassword}
                                    error={errors.confirmPassword ? true : false}
                                    fullWidth
                                    value={confirmPassword}
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
}

export default Signup
