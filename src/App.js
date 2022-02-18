import React, {useEffect, useState} from 'react'
import './App.css';
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"
function App() {
  const url = 'https://jsonplaceholder.typicode.com/todos/'
  const [groups, setGroup] = useState()
  const fetchApi = async () => {
    const response = await fetch(url)
    const responseJSON = await response.json()
    setGroup(responseJSON)
  }
  useEffect(() => {
    fetchApi()
  }, [])
  return (
    <div className="App">
      hola mundo 2
      <ul>
        { !groups ? 'Cargandoo...' : 
        groups.map((group, index)=>{
          return <li key={index}>{group.title} {group.completed ? ' ✅': '❌'}</li>
        })
        }
      </ul>
    </div>
  );
}
export default App;
