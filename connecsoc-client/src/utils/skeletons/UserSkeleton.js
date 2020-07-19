import React from 'react'
import noImg from './noImg.jpg'
import './Styles.css'

import { FaCalendarAlt, FaSearchLocation, FaGlobe } from 'react-icons/fa'
import { Paper } from '@material-ui/core'


const UserSkeleton = () =>
    <Paper>
        <div className="image-wrapper">
            <img src={noImg} alt="profile" className="image" />
        </div>
        <hr />
        <div className="profile">
            <div className="profile-handle" />
            <div className="bio" />
            <hr />
            <div className="data">
                <FaSearchLocation
                    size={20}
                    style={{ color: "52a178" }} />
                <span>
                    <div className="halfLine" />
                </span>
                <br />

                <FaGlobe
                    size={20}
                    style={{ color: "52a178" }} />
                <span>
                    <div className="halfLine" />
                </span>
                <br />

                <FaCalendarAlt
                    size={20}
                    style={{ color: "52a178" }} />
                <span>
                    <div className="halfLine" />
                </span>
            </div>
        </div>
    </Paper >

export default UserSkeleton;