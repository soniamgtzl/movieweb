import React, {Component} from 'react';
import {Link,Redirect,withRouter} from 'react-router-dom';
//Estilos
import './App.css';

//Header
class Header extends Component{
  constructor(props){
    super(props);
    this.hadleChanges = this.hadleChanges.bind(this);
    this.state={
      error : null,
      isLoaded : false,
      id : 0,
      poster:[],
      image:'https://image.tmdb.org/t/p/original'
    };
  }



  componentDidMount(){
      //Valor random id_image para mostrar distintas pelicula en Header
      var idImage=Math.floor(Math.random()*19);
      //URL de las peliculas más populares
      const url='https://api.themoviedb.org/3/discover/movie?api_key=d3210cb7a3c9ed9aa699040c06836318&language=en-US&sort_by=popularity.desc&include_adult=false';
      //Petición a la API
        fetch(url)
          .then(respuesta=>
            respuesta.json()
        ).then((res)=>{
                this.setState({
                isLoaded : true,
                //Id para ubicar la pelicula
                id : res['results'][idImage]['id'],
                //Obtener backdrop_path
                poster:res['results'][idImage]['backdrop_path']
              });
          });
    }
    hadleChanges(e){
      const titulo=e.target.value;
        this.setState({
          busqueda:titulo
        });
    }

  render(){
    const me=this.hadleChanges;
    var nombrePeli=this.state.busqueda;
    //Variable para asignar backdrop_path como backgroundImage
    var imageB ={
      backgroundImage:'url('+ this.state.image + this.state.poster +')'
    };
      return (
      <header style={imageB}  >
              <img src="../logo.png"/>
        <form onSubmit={()=>this.props.history.push('/busqueda/'+encodeURIComponent(nombrePeli))}>

          <input
          onChange={me}
          value={this.state.busqueda}
          type="text"
          placeholder="Buscar pelicula"/>
          <input
          type="submit"
          value="Buscar"
          />
        </form>

      </header>
    );
  }
}
export default withRouter(Header);
