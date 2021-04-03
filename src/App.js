import React, {useEffect, useState} from 'react'


const App = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch("http://localhost:4000/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlTmFtZSI6InJhcHBvcnQucGRmIiwiaWF0IjoxNjE3NDQ4MDc5LCJleHAiOjE2MTc0NjYwNzl9.zxjWZ6ZvqcLFB5zXaUEUPmuz9j4x58Pz1DENBcNBH-4", {
      method: "GET",
      headers: {
        'Accept': '*'
      }
    })
    .then(res => console.log(res))
    
  }, []);

  return (
    <div>
      {data}
    </div>
  )
}

export default App
