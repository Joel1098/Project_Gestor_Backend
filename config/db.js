//En este bloque, se importa el módulo mongoose, que es una biblioteca de modelado de objetos para MongoDB en Node.js.
import mongoose from "mongoose";

/*se define una función asíncrona llamada conectarDB. Dentro de esta función, 
se utiliza el método mongoose.connect() para establecer una conexión con la base de datos MongoDB. 
Se utiliza la URL proporcionada en process.env.MONGO_URI para establecer la conexión. 
Se pasan algunas opciones al método de conexión, como useNewUrlParser y useUnifiedTopology para evitar advertencias y errores relacionados con la conexión.*/
const conectarDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
/*Si la conexión es exitosa, se extraen los detalles de host y puerto de la conexión y se imprime un mensaje en la consola 
indicando que la conexión con MongoDB se ha establecido correctamente.*/
    const url = `${connection.connection.host}:${connection.connection.port}`;
    console.log(`MongoDB Conectado en: ${url} `);
/*Si ocurre algún error durante la conexión, se captura el error, 
se imprime un mensaje que incluye el mensaje de error y se sale del proceso de Node.js utilizando process.exit(1). 
Esto asegura que si la conexión falla, el programa se detendrá en lugar de seguir ejecutándose con una conexión inválida.*/
  } catch (error) {
    console.log(`error: ${error.message}`);
    process.exit(1);
  }
};
/*Finalmente, la función conectarDB se exporta como el valor predeterminado del módulo. 
Esto significa que la función puede ser importada y utilizada en otros archivos de JavaScript.*/
export default conectarDB;
