import React, { Fragment } from 'react'
import {
    Card,
    CardContent,
    CardMedia,
} from '@material-ui/core'
import noImg from './noImg.jpg'
import './Styles.css'

const PostsSkeleton = () => {
    const content = Array.from({ length: 5 }).map((item, index) => (
        <Card key={index}>
            <CardMedia
                component="img"
                image={noImg}
                title="Profile" />
            <CardContent>
                Loading
                <div className="handle" />
                <div className="date" />
                <div className="fullLine" />
                <div className="fullLine" />
                <div className="halfLine" />
            </CardContent>
        </Card>
    ))

    return (
        <Fragment>
            {content}
        </Fragment>
    )
}

export default PostsSkeleton