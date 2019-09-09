//importar componentes
import React, {Component} from 'react';
import Header from './header';
import Categorias from './categorias';
import Footer from './footer';

//Estilos generales
import './App.css';


class Principal extends Component{


  render(){
    return (
      <div className="App">
        < Header />
        < Categorias/>
        < Footer />

      </div>
    );
  }

}

export default Principal;
