import React from 'react'

const Table = ({props}) => {

    const {data, token} = props;

    const sendHandler = (jwt) => {
        fetch()

    }
    const deleteHandler = (jwt) => {
        fetch(`http://localhost:4000/delete/${jwt}`, {
            method: 'POST',
            headers: {
                'authorization': token
            }
        })

    }
    console.log(data)
    return (
        <div className="table-container">
            <table className="file-link-table">
                <tr>
                    <th>File Name</th>
                    <th>Download Link</th>
                    <th>Email From</th>
                    <th>Email To</th>
                    <th>Created At</th>
                    <th></th>
                </tr>
                {data.map(({ file_path, jwt, email_from, email_to, created_at }) => (
                    <tr>
                        <th>{file_path}</th>
                        <th> <a href={`http://localhost:4000/download/${jwt}`}>Download</a></th>
                        <th>{email_from}</th>
                        <th>{email_to}</th>
                        <th>{created_at}</th>
                        <th>
                            <button onClick={() => sendHandler(jwt)} className="send">Send</button>
                            <button onClick={() => deleteHandler(jwt)} className="send">Delete</button>
                        </th>
                    </tr>
                ))}
            </table>

        </div>
    )
}

export default Table
