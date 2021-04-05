import React from 'react'

const Login = ({ props }) => {

    const { handleSubmit, email, setEmail, password, setPassword } = props;
    return (
        <div className="login-container">
            <form onSubmit={(e) => handleSubmit(e, email, password)}>
                <div className="input">
                    <label htmlFor='email'>Email</label>
                    <input className="text" type='email' name='email' onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="input">
                    <label htmlFor='password'>Password</label>
                    <input className="text" type='password' name='password' onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="input">
                    <input className="submit" type='submit' value='Login' />
                </div>

            </form>
        </div>
    )
}

export default Login
