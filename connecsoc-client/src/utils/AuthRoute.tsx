import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { ReduxState } from '../redux/store'

const AuthRoute = ({ component: Component, isAuthenticated, ...rest }: any) =>
    <Route
        {...rest}
        render={(props: any) =>
            isAuthenticated ? (<Redirect to="/" />) : (<Component {...props} />)
        }
    />

const mapStateToProps = (state: ReduxState) => ({
    isAuthenticated: state.user.authenticated
})

export default connect(mapStateToProps)(AuthRoute)

