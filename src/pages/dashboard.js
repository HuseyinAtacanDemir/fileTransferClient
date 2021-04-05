import React, { useEffect, useState } from 'react'
import Table from '../components/table'

const Dashboard = ({ token }) => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = (token, setData) => {
        if (token !== "") {
            console.log(token)
            fetch("http://192.168.3.67:4000/dashboard", {
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
    }, [token]);

    useEffect(() => {
        if(error) {
            alert(error)
            setError(null)
        }
    }, [error]);
    return (
        <div className="wrapper">
            {data && <Table props={{ data, setData, token, fetchData, setError }} />}
        </div>
    )
}

export default Dashboard
