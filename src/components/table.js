import React, { useState } from 'react'

const Table = ({ props }) => {

    const { data, setData, token, fetchData, setError, public_ip } = props;

    const [file, setFile] = useState('');
    const [expiration, setExpiration] = useState('');
    const [emailFrom, setEmailFrom] = useState('');
    const [emailTo, setEmailTo] = useState('');
    const [key, setKey] = useState('');
    const uploadHandler = (e) => {
        //console.log("file: ", file[0])
        e.preventDefault();

        setKey('selected');

        if (!file[0] || !expiration || !emailFrom || !emailTo) {
            setError('Please fill all fields before submitting a file')
            return
        }

        const formData = new FormData();
        formData.append('file', file[0])
        formData.append('expiration', expiration)
        formData.append('email_to', emailTo)
        formData.append('email_from', emailFrom)


        fetch(`http://${public_ip}:4000/upload`, {
            method: 'POST',
            headers: {
                'authorization': token
            },
            body: formData
        }).then(res => {
            //console.log(res)
            return res.json()
        })
            .then(res => {

                if (res[0].message && res[0].message === 'File uploaded!') {

                    fetchData(token, setData)
                    setFile(null)
                    setEmailFrom('')
                    setEmailTo('')
                    setExpiration('')
                    setKey('');
                    alert('File uploaded!')
                }
                if (res[0].error) {
                    if (res[0].error.includes('expiresIn')) {
                        res[0].error = 'Please enter a valid expiration duration as the number of hours'
                    }
                    setError(res[0].error);
                }
            })
    }

    const deleteHandler = (jwt) => {
        fetch(`http://${public_ip}:4000/delete/${jwt}`, {
            method: 'GET',
            headers: {
                'authorization': token
            }
        }).then(res => res.json())
            .then(res => {
                //console.log(res)
                alert(res[0].message)
            })
            .then(
                setData(data.filter((item) => item.jwt !== jwt))
            )
    }

    return (
        <div className="table-container">
            <form onSubmit={(e) => uploadHandler(e)}>
                <table className="file-link-table">
                    <thead className="header">

                        <th><span>File Name</span></th>
                        <th><span>Expiration (hours)</span></th>
                        <th><span>Download Link</span></th>
                        <th><span>Email From</span></th>
                        <th><span>Email To</span></th>
                        <th><span>Created At</span></th>
                        <th><span>Action</span></th>


                    </thead>

                    <tr className="file-input">
                        <td ><input className="file" key={key ? key : ''} type="file" name="file" onChange={(e) => setFile(e.target.files)} /></td>
                        <td><input type="text" name="expiration" placeholder="expiration" value={expiration} onChange={(e) => setExpiration(e.target.value)} /></td>
                        <td>-</td>
                        <td><input type="email" name="email_from" placeholder="Email From" value={emailFrom} onChange={(e) => setEmailFrom(e.target.value)} /></td>
                        <td><input type="email" name="email_to" placeholder="Email To" value={emailTo} onChange={(e) => setEmailTo(e.target.value)} /></td>
                        <td>a</td>
                        <td className="action"><input type="submit" value="Upload!" /></td>
                    </tr>

                    {data.map(({ file_path, expiration, jwt, email_from, email_to, created_at }, idx) => (
                        <tr key={idx}>
                            <td>{file_path}</td>
                            <td>{expiration}</td>
                            <td className="download-link" > <span onClick={() => navigator.clipboard.writeText(`http://192.168.3.67:4000/download/${jwt}`)}>Copy Link</span></td>
                            <td>{email_from}</td>
                            <td>{email_to}</td>
                            <td>{created_at}</td>
                            <td className="action">
                                <button onClick={(e) => { e.preventDefault(); window.location.href = `mailto:${email_to}?subject=Soder Download Link` }} className="send">Send</button>
                                <button onClick={() => deleteHandler(jwt)} className="send">Delete</button>
                            </td>
                        </tr>
                    ))}
                </table>
            </form>
            {data.length === 0 && <span className="no-data">No File Exists In DB</span>}
        </div>
    )
}

export default Table
