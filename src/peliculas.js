import React, {
  Component
} from 'react';
import {Link,Redirect,withRouter} from 'react-router-dom';
//Estilos
import './App.css';
class Pelicula extends Component {

  constructor(props) {
    super(props);
    this.state = {
        idGenero: this.props.idGenero,
        catActual:this.props.catActual,
        pelicula:[],
        load:false
        };
  }

  componentDidMount() {
    this.peticionApi(this.props.idGenero);
  }
  componentWillReceiveProps(nextProps){
    this.peticionApi(nextProps['idGenero']);
  }

  /**********************************************************
  peticionApi*/
  peticionApi(idGenero){

    const key='d3210cb7a3c9ed9aa699040c06836318';
    //URL de busqueda por genero
    const url ='https://api.themoviedb.org/3/discover/movie?api_key='+key+'&with_genres='+idGenero;
    //Petición a la API
    fetch(url)
      .then(respuesta =>
        //La respuesta del servidor la converimos a json
        respuesta.json()
      ).then((res) => {
        this.setState({
          pelicula:this.datosPelicula(res),

        });

      });
  }
  /**********************************************************
  Datos de peliculas*/
  datosPelicula(res){

    var datos=[];
    var tamaño=res['results'].length;
     for(var i=0 ; i<tamaño ; i++){
       datos.push(res['results'][i]);
     }
     return datos;
  }


  render() {

    var urlImagen='https://image.tmdb.org/t/p/w500';
    return (
      <div id="peliculas">
      <h2 id="titulo-cat">{this.props.catActual}</h2>

      <div id="lienzo-pel">
      {this.state.pelicula.map(function(pel) {
        return (<Link to={'/pelicula/'+ pel['id']}><div key={pel['id']}><img src={urlImagen+pel['backdrop_path']}/> <h3>{pel['original_title']}</h3> <p>{pel['release_date']}</p> </div></Link>);
      })}
      </div>
      </div>
    );
};
}

export default Pelicula;
