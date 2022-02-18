import React, {useEffect, useState} from 'react'
import './App.css';
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
function App() {
  
  const [users, setUsers]= useState([])
  const [tableUsers, setTableUsers]= useState([])
  const [search, setSearch]= useState("")

  const requestGet=async()=>{
    await axios.get("https://jsonplaceholder.typicode.com/todos/")
    .then(response=>{
      setUsers(response.data);
      setTableUsers(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const handleChange=e=>{
    setSearch(e.target.value)
    filter(e.target.value)
  }
  const filter=(itemSearch)=>{
    let resultsSearch=tableUsers.filter((item)=>{
      if(item.userId.toString().toLowerCase().includes(itemSearch.toLowerCase())
        || item.id.toString().toLowerCase().includes(itemSearch.toLowerCase())
        || item.title.toString().toLowerCase().includes(itemSearch.toLowerCase())){
        return item
      }
    })
    setUsers(resultsSearch)
  }
  useEffect(() => {
    requestGet();
  },[])
  return (
    <div className="App">
    <div className="containerInput container pt-3">
      <input type="text" className="form-control inputSearch" value={search} placeholder="Búsqueda por User Id, Id y Tarea"
      onChange={handleChange} />
      <button className="btn btn-success">
        <FontAwesomeIcon icon={faSearch}/>
      </button>
    </div>
      <div className="table-responsive">
        <table className="table table-sm table-bordered">
          <thead>
            <tr>
              <th>User Id</th>
              <th>id</th>
              <th>Tarea</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            { users && 
              users.map((user)=>(
                /* return <li key={index}>{group.title} {group.completed ? ' ✅': '❌'}</li> */
                <tr key={user.id}>
                  <td>{user.userId}</td>
                  <td>{user.id}</td>
                  <td>{user.title}</td>
                  <td>{user.completed ? ' ✅': '❌'}</td>
                </tr>
              ))}
          </tbody>
          
        </table>
      </div>
    </div>
  );
}
export default App;
