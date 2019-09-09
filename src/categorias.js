import React, {
  Component
} from 'react';
//importar componente Pelicula
import Peliculas from './peliculas';
//Estilos generales
import './App.css';

class Categorias extends Component {

  constructor(props) {
    super(props);
    this.hadleClick = this.hadleClick.bind(this);
    this.state = {
      //Array de generos
      printCategorias: [],
      //Id actual
      idActual:28,
      //Categoria Actual
      catActual:'Acción',
      peliculas:[]

      };
  }

  componentDidMount() {
    //URL de generos
    const url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=d3210cb7a3c9ed9aa699040c06836318&language=es-MX';
    //Petición a la API
    fetch(url)
      .then(respuesta =>
        //La respuesta del servidor la converimos a json
        respuesta.json()
      ).then((res) => {
        this.setState({
          //Llamamos a OrdCategorias para que nos devuelva un array de generos y se actualice printCategorias
          printCategorias: this.OrdCategorias(res)
        });

      });

}
/**********************************************************
Ordenar Categorias*/
OrdCategorias(res){
  //Numero de generos que nos devuelve el servidor
    var tamaño = res['genres'].length;
  //Nuevo arreglo para guardar los generos
    var datos =[];
  //Ciclo para entrar a cada array de categorias y obtener el nombre de cada genero
  for (var i = 0; i < tamaño; i++) {
    //Ingresar cada nombre de categoria en datos
    datos.push(res['genres'][i]);
  }
  //Regresamos array con los nombres de generos
  return datos;
}
  /**********************************************************
  Peliculas*/
    setPelicula( id, genero){
      var datos=[];
      datos.push();
      return (datos);
    }
    /**********************************************************
    Click*/

  hadleClick=(e,gen)=>{
    this.setState({
      idActual:gen['id'],
      catActual:gen['name']
    });


  }

  render() {
    const me = this.hadleClick;

    return (
      <div id="main">
      <div id="categorias">
      {this.state.printCategorias.map(function(gen) {
        return (<input onClick={ (e)=>me(e,gen)} type="submit" key={gen['id']}  value={gen['name']}/>);
      })}

      </div>
      //mandar props a Peliculas
      {<Peliculas idGenero ={this.state.idActual} catActual={this.state.catActual}/>}
      </div>
    );
};
}

export default Categorias;
