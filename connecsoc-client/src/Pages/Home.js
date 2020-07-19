import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import Post from '../Components/Post/Index'
import Profile from '../Components/Profile/Index'
import PostsSkeleton from '../utils/skeletons/PostsSkeleton'

import { connect } from 'react-redux'
import { getPosts } from '../redux/actions/dataActions'

const Home = ({ getPosts, posts, loading }) => {

    useEffect(() => {
        getPosts()
    }, [])

    let c = 0;

    let recentPosts = !loading ? (
        posts.map((post) => (
            <div key={post.id}>
                <Post post={post} index={c++} />
            </div>
        ))

    ) :
        (
            <PostsSkeleton />
        )

    return (
        <div>
            <Grid container>
                <Grid item sm={8} xs={12}>
                    {recentPosts}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
            </Grid>
        </div>
    )
}

const mapStateToProps = state => ({
    posts: state.data.posts,
    loading: state.data.loading

})

const mapActionsToProps = {
    getPosts
}

export default connect(mapStateToProps, mapActionsToProps)(Home)