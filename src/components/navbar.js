import React from 'react'
import { useHistory } from "react-router-dom";

const Navbar = ({ props }) => {

    const { token, setToken } = props;
    const history = useHistory();

    const handleLogout = () => {
        setToken('');
        history.push('/login');
    }

    return (
        <nav className="navbar-container">
            <div className="navbar">
                <div>
                   Soder Secure File Transfer
                </div>
                <div className="action">
                    {token ? (
                        <span onClick={() => handleLogout()} className="login">
                            Logout
                        </span>
                    ) : (
                        <span>
                            Login
                        </span>
                    )}

                </div>
            </div>
        </nav>
    )
}

export default Navbar
