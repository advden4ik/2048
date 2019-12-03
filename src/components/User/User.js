import React from 'react'
import classes from './User.module.css'

const User = ({email, logout}) => {
    return (
        <div className={classes.User}>
            <h4>Logged as {email}</h4>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default User
