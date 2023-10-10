/* 
Genera un identificador único compuesto por una cadena aleatoria
en base 32 seguida de una cadena de marca de tiempo en base 32, 
lo que lo hace adecuado para ser utilizado como un identificador único en la aplicación. 
*/
const generarId = () => {
  //Obtiene un número lo convierte una cadena base 32, y quita los dos primeros caracteres.
  const random = Math.random().toString(32).substring(2);
  //Obtiene el tiempo actual y lo convierte a una cadena base 32
  const fecha = Date.now().toString(32);
  //Regreso de la concatenación random y fecha
  return random + fecha;
};

//Permite su uso en otros lados.
export default generarId;
