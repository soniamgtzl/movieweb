import React, {Component} from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
//Importar componente Principal de principal.js
import Principal from './principal';
//Importar componente Movie de movie.js
import Movie from './movie';
//Importar Busqueda Principal de busqueda.js
import Busqueda from './busqueda';
//Importar estilos generales
import './App.css';

function App() {
  return (
    //Se establece el ruteo
    <BrowserRouter>
      <Switch>
        //Se define la ruta principal
        <Route exact path='/' component={Principal}/>
        //Ruta para ver caracteristicas de una pelicula
        <Route exact path='/pelicula/:idPelicula' component={Movie}/>
        //Ruta para ver peliculas según la busqueda
        <Route exact path='/busqueda/:nombreP' component={Busqueda}/>
      </Switch>
    </BrowserRouter>
  );
}


export default App;
