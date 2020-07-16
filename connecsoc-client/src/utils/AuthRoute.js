import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const AuthRoute = ({ component: Component, isAuthenticated, ...rest }) =>
    <Route
        {...rest}
        render={props =>
            isAuthenticated ? (<Redirect to="/" />) : (<Component {...props} />)
        }
    />

const mapStateToProps = state => ({
    isAuthenticated: state.user.authenticated
})

export default connect(mapStateToProps)(AuthRoute)

