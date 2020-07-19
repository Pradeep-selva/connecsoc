import React, { useEffect } from 'react'
import axios from 'axios'

import { Grid } from '@material-ui/core'

import { connect } from 'react-redux'
import { getUserPosts } from '../redux/actions/dataActions'

import Post from '../Components/Post/Index'
import UserStaticProfile from '../Components/UserStaticProfile/Index'
import { useUserState } from '../utils/customHooks'
import PostsSkeleton from '../utils/skeletons/PostsSkeleton'

const UserPage = (props) => {
    const [userState, setUserState] = useUserState({
        profile: {},
        userLoading: false
    })

    useEffect(() => {
        const handle = props.match.params.handle;
        props.getUserPosts(handle);

        setUserState({
            userLoading: true,
        })

        axios.get(`/user/${handle}`)
            .then(res => {
                setUserState({
                    profile: res.data.user,
                    userLoading: false
                })
            })
            .catch(err => {
                console.log(err)
                setUserState({
                    userLoading: false
                })
            })
    }, [])

    const {
        profile,
        userLoading
    } = userState

    const {
        posts,
        postLoading
    } = props

    let c = 0;

    let userPosts = !postLoading ? (posts !== null ? (
        !props.match.params.postId ? (posts.map((post) => (
            <div>
                <Post
                    key={post.id}
                    post={post}
                    index={c++}
                />
            </div>
        ))) : (posts.map(post => {
            if (post.id !== props.match.params.postId)
                return (
                    <Post
                        key={post.id}
                        post={post}
                        index={c++}
                    />
                )
            else
                return (
                    <Post
                        key={post.id}
                        post={post}
                        index={c++}
                        openPost={true}
                    />
                )
        }))) : (
            <p>No posts yet :)</p>
        )) :
        (
            <PostsSkeleton />
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


const mapStateToProps = state => ({
    posts: state.data.posts,
    postLoading: state.data.loading
})

const mapActionsToProps = {
    getUserPosts
}

export default connect(mapStateToProps, mapActionsToProps)(UserPage)