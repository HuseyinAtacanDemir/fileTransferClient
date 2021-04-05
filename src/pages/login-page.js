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

        if (!email || !password) {
            alert('Please enter email and password')
            return
        }

        fetch("http://192.168.3.67:4000/login", {
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
            if (res[0].error) {
                alert(res[0].error)
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
