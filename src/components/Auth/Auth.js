import React, { useState } from 'react'
import classes from './Auth.module.css'

const Auth = ({register, login}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = e => e.preventDefault()

    return (
        <div className={classes.Auth}>
            <div>
                <h1>Авторизация</h1>

                <form className={classes.AuthForm} onSubmit={handleSubmit}>
                    <label>
                        <h3>Email</h3>
                        <input value={email} onChange={e => setEmail(e.target.value)}
                               type="email" placeholder="Enter Email" />
                    </label>
                    <label>
                        <h3>Password</h3>
                        <input value={password} onChange={e => setPassword(e.target.value)}
                               type="password" placeholder="Enter Password"
                               title='Password should be at least 6 characters' />
                    </label>

                    <div className={classes.Buttons}>
                        <button
                            onClick={() => login(email, password)}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => register(email, password)}
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Auth