import React from 'react'
import classes from './Loader.module.css'

const Loader = () => (
    <div className={classes.loadLoader}>
        <div className={`${classes.loadInner} ${classes.loadOne}`} />
        <div className={`${classes.loadInner} ${classes.loadTwo}`} />
        <div className={`${classes.loadInner} ${classes.loadThree}`} />
    </div>
)

export default Loader
