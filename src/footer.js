import React, {Component} from 'react';
//Estilos generales
import './App.css';


class Footer extends Component{
  constructor(props){
    super(props);

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


  render(){
    var imageB ={
      backgroundImage:'url('+ this.state.image + this.state.poster +')'
    };
    return (
        <footer style={imageB}>
            <p>Hecho por : Sonia M. Gutiérrez Lara | 2019</p>
        </footer>
    );
  }

}

export default Footer;
