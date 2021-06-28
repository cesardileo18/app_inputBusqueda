import React, {useState,useEffect} from 'react';
import './App.css';
import {Helmet} from "react-helmet";
import favicon from './imagenes/1614171402.ico';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [usuarios, setUsuarios]= useState([]);
  const [tablaUsuarios, setTablaUsuarios]= useState([]);
  const [busqueda, setBusqueda]= useState("");

const peticionGet=async()=>{
  await axios.get("https://jsonplaceholder.typicode.com/users")
  .then(response=>{
    setUsuarios(response.data);
    setTablaUsuarios(response.data);
  }).catch(error=>{
    console.log(error);
  })
}

const handleChange=e=>{
  setBusqueda(e.target.value);
  filtrar(e.target.value);
}

const filtrar=(terminoBusqueda)=>{
  var resultadosBusqueda=tablaUsuarios.filter((elemento)=>{
    if(elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
    || elemento.company.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())||
    elemento.username.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())|| 
    elemento.phone.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())||
     elemento.email.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())||
      elemento.address.city.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
    ){
      return elemento;
    }
  });
  setUsuarios(resultadosBusqueda);
}

useEffect(()=>{
peticionGet();
},[])
  return(
    <>
      <Helmet>
        <link rel="shortcut icon" href={favicon} type="image/x-icon"/>
        <title>Usuarios</title>
      </Helmet>
      <div className="container">
      <div className="barraBusqueda">
              <input
                type="text"
                placeholder="Buscar"
                className="textField"
                onChange={handleChange}
                value={busqueda}
              />
              <button type= "submit" className="btnBuscar">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
        <div className ="clear">
        <div className = "container ">
            <div className = "row">
            {usuarios && 
                     usuarios.map((usuario)=>(
                     <div className = "col-md-4 mb-4" key = {usuario.id}>
                         <div className = "card  text-center bg-dark">
                          
                          <div className = "card-body text-light ">
                              <h4 className = "card-tittle">Usuarios</h4>
                              <p className = "card-text text-secondary">{"Name: "+usuario.name}</p>
                              <p className = "card-text text-secondary">{"Username: " +usuario.username}</p>
                              <p className = "card-text text-secondary">{"Email: " +usuario.email}</p>
                              <p className = "card-text text-secondary">{"City: " +usuario.address.city}</p>
                              <p className = "card-text text-secondary">{"Phone: " +usuario.phone}</p>
                              <p className = "card-text text-secondary">{"Company name: " +usuario.company.name}</p>
                          </div>
                       </div>
                    </div>
                  ))
              }
            </div>
        </div>
        </div> 
      </div>
    </>
    );
}

export default App;
