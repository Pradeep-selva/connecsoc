import React, { Component } from 'react'
import axios from 'axios'

import { Grid } from '@material-ui/core'

import { connect } from 'react-redux'
import { getUserPosts } from '../redux/actions/dataActions'

import Post from '../Components/Post/Index'
import UserStaticProfile from '../Components/UserStaticProfile/Index'

class UserPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            profile: {},
            userLoading: false
        }
    }

    componentDidMount() {
        console.log('user page mounted')
        const handle = this.props.match.params.handle;
        this.props.getUserPosts(handle);

        this.setState({
            userLoading: true
        })

        axios.get(`/user/${handle}`)
            .then(res => {
                this.setState({
                    profile: res.data.user,
                    userLoading: false
                })
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    userLoading: false
                })
            })
    }

    render() {
        const {
            profile,
            userLoading
        } = this.state

        const {
            posts,
            postLoading
        } = this.props

        let c = 0;

        let userPosts = !postLoading ? (
            posts.map((post) => (
                <div>
                    <Post key={post.id} post={post} index={c++} />
                </div>
            ))

        ) :
            (
                <p>Loading...</p>
            )

        return (
            <div>
                <Grid container spacing={30}>
                    <Grid item sm={8} xs={12}>
                        {userPosts}
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        <UserStaticProfile
                            profile={profile}
                            loading={userLoading}
                        />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.data.posts,
    postLoading: state.data.loading
})

const mapActionsToProps = {
    getUserPosts
}

export default connect(mapStateToProps, mapActionsToProps)(UserPage)