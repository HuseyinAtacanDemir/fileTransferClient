import React from 'react'

const Login = ({props}) => {

    const {handleSubmit, email, setEmail, password, setPassword} = props;
    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e, email, password)}>
                <label htmlFor='email'>Email</label>
                <input type='email' name='email' onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor='password'>Password</label>
                <input type='password' name='password' onChange={(e) => setPassword(e.target.value)} />
                <input type='submit' value='Login' />
            </form>
        </div>
    )
}

export default Login
