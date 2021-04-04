import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import Login from '../components/login'

const LoginPage = ({ props }) => {

    const { token, setToken } = props;

    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e, email, password) => {
        e.preventDefault()

        fetch("http://localhost:4000/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then(res => {
            setEmail('')
            setPassword('')
            return res.json()
        }).then(res => {
            if (res.length === 1) {
                setToken(res[0].token)
                history.push('/dashboard')
            }
        })

    }

    return (
        <div className="wrapper">
            <Login props={{ handleSubmit, email, setEmail, password, setPassword }} />
        </div>
    )
}

export default LoginPage
