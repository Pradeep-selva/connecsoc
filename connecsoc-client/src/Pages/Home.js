import React, { Component } from 'react'
import axios from 'axios'
import { Grid } from '@material-ui/core'
import Post from '../Components/Post/Index'


export class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            posts: null,
            errors: null
        }
    }

    componentDidMount() {
        axios.get('/posts')
            .then(res => {
                this.setState({
                    posts: res.data
                })
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    errors: err
                })
            })
    }

    render() {
        const { posts, errors } = this.state

        let recentPosts = posts && !errors ? (
            posts.map((post) => <Post key={post.postId} post={post} />)
        ) :
            (
                <p>Loading...</p>
            )

        return (
            <div>
                <Grid container spacing={30}>
                    <Grid item sm={8} xs={12}>
                        {recentPosts}
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        <h2>User Profile</h2>
                        <h5>* Add stuff</h5>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Home