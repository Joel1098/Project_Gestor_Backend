import mongoose from "mongoose";

/*Esta funciona nos permite acceder a una libreria llamada mongoose la cual nos ayuda al modelo de base de datos
no relacionales que para este caso es el esquema de datos para el modelo de proyecto el cual se compone por:*/
const proyectosSchema = mongoose.Schema(
  {
    nombre: {//Un campo de tipo String que representa el nombre del proyecto. Se especifica como obligatorio (required) y se eliminarán los espacios en blanco alrededor del valor (trim).
      type: String,
      trim: true,
      required: true,
    },
    descripcion: {// Un campo de tipo String que representa la descripción del proyecto. Al igual que el nombre, es obligatorio y se eliminarán los espacios en blanco.
      type: String,
      trim: true,
      required: true,
    },
    fechaEntrega: {//Un campo de tipo Date que representa la fecha de entrega del proyecto. Por defecto, si no se proporciona una fecha, se establece en la fecha y hora actual.
      type: Date,
      default: Date.now(),
    },
    cliente: {//Un campo de tipo String que almacena el nombre del cliente del proyecto. Es obligatorio y elimina espacios en blanco.
      type: String,
      trim: true,
      required: true,
    },
    creador: {// Un campo de tipo ObjectID que se relaciona con la colección "Usuario" a través de la referencia "Usuario". Esto sugiere que este campo se usa para relacionar el proyecto con el usuario que lo creó.
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
    },
    tareas: [//Un campo de tipo Array que almacena ObjectIDs y se relaciona con la colección "Tarea" a través de la referencia "Tarea". Esto permite asociar tareas específicas con este proyecto.
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tarea",
      },
    ],
    colaboradores: [//Un campo de tipo Array similar al campo "tareas", que permite relacionar varios usuarios con el proyecto.
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
      },
    ],
  },

  {/*Esto agrega automáticamente dos campos a los documentos de la colección: createdAt y updatedAt. 
Estos campos se utilizan para realizar un seguimiento de cuándo se creó 
y actualizó por última vez un documento.*/
    timestamps: true,
  }
);


/*Se crea un modelo de datos llamado Proyecto utilizando el esquema proyectosSchema. 
Este modelo se utilizará para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en la colección de proyectos en la base de datos MongoDB.*/

const Proyecto = mongoose.model("Proyecto", proyectosSchema);
export default Proyecto;
