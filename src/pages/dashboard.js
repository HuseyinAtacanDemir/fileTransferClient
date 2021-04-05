import React, { useEffect, useState } from 'react'
import Table from '../components/table'

const Dashboard = ({ token, public_ip }) => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = (token, setData) => {
        if (token !== "") {

            fetch(`http://${public_ip}:4000/dashboard`, {
                method: "GET",
                headers: {
                    'authorization': token
                }
            })
                .then(res => res.json())
                .then(res => {
                    setData(res)
                })
        }
    }

    useEffect(() => {
        fetchData(token, setData)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    useEffect(() => {
        if (error) {
            alert(error)
            setError(null)
        }
    }, [error]);
    return (
        <div className="wrapper">
            {data && <Table props={{ data, setData, token, fetchData, setError, public_ip }} />}
        </div>
    )
}

export default Dashboard
