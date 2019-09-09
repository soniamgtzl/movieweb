import React, {Component} from 'react';
//Importa los componentes de react-router
import {Link,withRouter} from 'react-router-dom';
//Estilos generales
import './App.css';


class Busqueda extends Component{
  constructor(props){
    super(props);
    this.state={
      datosBusqueda:[]
    };
  }
  componentDidMount() {
    const{
      match
    }=this.props;
    this.obtenerMovie(match['params']['nombreP']);
  }

  /**********************************************************
  peticion Api movie por nombre*/
  obtenerMovie(nombreP){

    const key='d3210cb7a3c9ed9aa699040c06836318';
    //URL de busqueda por movie_id
    const url ='https://api.themoviedb.org/3/search/movie?api_key='+key+'&page=1&query='+encodeURIComponent(nombreP);

    //Petición a la API
    fetch(url)
      .then(respuesta =>
        //La respuesta del servidor la converimos a json
        respuesta.json()
      ).then((res) => {
        this.setState({
          datosBusqueda:this.obtenerBusqueda(res)
        });

      });
  }
  /**********************************************************
  obtenerBusqueda*/
  obtenerBusqueda(res){
    var resultados=[];
    var tamaño=res['results'].length;
    for(var i=0; i<tamaño; i++){
      resultados.push(res['results'][i]);
    }
    console.log(resultados);
    return resultados;
  }


  render(){
    //url para obtener imagen
    const urlImagenBus='https://image.tmdb.org/t/p/w500';
    //comprobar si se escribio algo en el buscador
    if(this.state.datosBusqueda.length == 0){
      return(<div id="resultados-busq">
      <h1>No se encontró resultados</h1>
      </div>);
    }else{
      return(
        <div id="resultados-busq">
        <h1>Resultados de busqueda: {this.props.match['params']['nombreP']}</h1>
        <div id="resultadosBP">
        {this.state.datosBusqueda.map(function(bus) {
          return (<Link to={'/pelicula/'+ bus['id']} key={bus['id']}>
                    <div id="pelicula" key={bus['id']}>
                      <img src={urlImagenBus+bus['backdrop_path']}/>
                      <p>{bus['original_title']}</p>
                    </div>
                  </Link>);})}
        </div>
        </div>
      );
    }

  }

}
//exportar componente
export default withRouter(Busqueda);
