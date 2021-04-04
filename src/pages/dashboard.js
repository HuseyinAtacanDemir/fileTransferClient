import React, { useEffect, useState } from 'react'
import Table from '../components/table'

const Dashboard = ({ token }) => {

    const [data, setData] = useState(null);

    useEffect(() => {
        if (token !== "") {
            console.log(token)
            fetch("http://localhost:4000/dashboard", {
                method: "GET",
                headers: {
                    'authorization': token
                }
            })
                .then(res => res.json())
                .then(res => {
                    console.log("data: ", res)
                    setData(res)
                })
        }

    }, [token]);

    return (
        <div className="wrapper">
            {data && <Table props={{ data, token }} />}
        </div>
    )
}

export default Dashboard
