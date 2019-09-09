import React, {Component} from 'react';
import {Link,Redirect,withRouter} from 'react-router-dom';

//Estilos
import './App.css';


class Movie extends Component{
  constructor(props){
    super(props);
    this.state={
        datosPelicula:[],
        datosCast:[],
        datosPeliculasR:[]
    };
  }
  componentDidMount() {
    const{
      match
    }=this.props;

    var movieId=match['params']['idPelicula'];

    this.obtenerMovie(movieId);
    this.obtenerCast(movieId);
    this.obtenerPeliculasR(movieId);

  }
  componentWillReceiveProps(nextProps){
    var idPeli=nextProps['match']['params']['idPelicula'];
    this.obtenerMovie(idPeli);
    this.obtenerCast(idPeli);
    this.obtenerPeliculasR(idPeli);
  }
  /**********************************************************
  peticion Api movie */
  obtenerMovie(idMovie){

    const key='d3210cb7a3c9ed9aa699040c06836318';
    //URL de busqueda por movie_id
    const url ='https://api.themoviedb.org/3/movie/'+idMovie+'?api_key='+key+'&language=es';
    //Petición a la API
    fetch(url)
      .then(respuesta =>
        //La respuesta del servidor la converimos a json
        respuesta.json()
      ).then((res) => {
        this.setState({
          datosPelicula:res
        });

      });
  }
  /**********************************************************
  peticion Api cast */
  obtenerCast(idMovie){

    const key='d3210cb7a3c9ed9aa699040c06836318';
    //URL de busqueda por movie_id
    const url ='https://api.themoviedb.org/3/movie/'+idMovie+'/credits?api_key='+key+'&language=es';
    //Petición a la API
    fetch(url)
      .then(respuesta =>
        //La respuesta del servidor la converimos a json
        respuesta.json()
      ).then((res) => {
        this.setState({
          datosCast:this.principalCast(res)
        });
      });
  }
  /**********************************************************
  limitar numero de actores que regresa la API */
  principalCast(res){
    var datos=[];
     for(var i=0 ; i<4 ; i++){
       datos.push(res['cast'][i]);
     }
     return datos;
  }
  /**********************************************************
  peticion Api peliculas relacionadas */
  obtenerPeliculasR(idMovie){

    const key='d3210cb7a3c9ed9aa699040c06836318';
    //URL de busqueda por movie_id
    const url ='https://api.themoviedb.org/3/movie/'+idMovie+'/similar?api_key='+key+'&language=en-US&page=1';
    //Petición a la API
    fetch(url)
      .then(respuesta =>
        //La respuesta del servidor la converimos a json
        respuesta.json()
      ).then((res) => {
        this.setState({
          datosPeliculasR:this.peliculasRelacionadas(res)
        });
      });
  }
  /**********************************************************
  limitar numero de peliculas relacionadas que regresa la API */
  peliculasRelacionadas(res){
    var pR=[];
     for(var i=0 ; i<5 ; i++){
       pR.push(res['results'][i]);
     }
     return pR;
  }
  /**********************************************************/
  render(){
    var urlImagen='https://image.tmdb.org/t/p/w500'+ this.state.datosPelicula['poster_path'];
    var urlImagenPer='https://image.tmdb.org/t/p/w500';

    return(

      <div id="pelicula-esp">
      <img src={urlImagen}/>
      <h2>{this.state.datosPelicula['original_title']}</h2>
      <p id="fecha">{this.state.datosPelicula['release_date']}</p>
      <p id="idioma">Idioma original: {this.state.datosPelicula['original_language']}</p>
      <p id="t-sinopsis">Sinopsis:</p>
      <p id="sinopsis">{this.state.datosPelicula['overview']}</p>
      <section id="reparto">
        <h3>Reparto general</h3>
        <div id="reparto-cont">{this.state.datosCast.map(function(per) {
          return (<div key={per['id']}><img src={urlImagenPer+per['profile_path']}/> <p>{per['name']}</p> <p>{per['character']}</p> </div>);
        })}</div>
        </section>

        <section id="peliRelacionadas">
        <h3>Peliculas relacionadas</h3>
        <div id="peliRelacionada">
        {this.state.datosPeliculasR.map(function(pelR) {
          return (<Link to={'/pelicula/'+ pelR['id']} key={pelR['id']}><div><img src={urlImagenPer+pelR['poster_path']}/> <h3>{pelR['original_title']}</h3></div></Link>);
        })}
        </div>
        </section>

      </div>
    );
  }

}

export default Movie;
