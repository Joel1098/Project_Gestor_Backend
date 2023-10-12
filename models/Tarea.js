import mongoose from "mongoose";

const tareaSchema = mongoose.Schema(
  {
    nombre: {//Un campo de tipo String que representa el nombre de la tarea. Se especifica como obligatorio (required) y se eliminarán los espacios en blanco alrededor del valor (trim).
      type: String,
      trim: true,
      required: true,
    },
    descripcion: {// Un campo de tipo String que representa la descripción de la tarea. Al igual que el nombre, es obligatorio y se eliminarán los espacios en blanco.
      type: String,
      trim: true,
      required: true,
    },
    estado: {//Especifica si la tarea ha sido entregada o no
      type: Boolean,
      default: false,
    },
    fechaEntrega: {//Un campo de tipo Date que representa la fecha de entrega de la tarea. Por defecto, si no se proporciona una fecha, se establece en la fecha y hora actual.
      type: Date,
      required: true,
      default: Date.now(),
    },
    prioridad: {//Especifica que tan importante es que se entregue alguna tarea
      type: String,
      required: true,
      enum: ["Baja", "Media", "Alta"],
    },
    proyecto: {//Campo el cual especifica a que proyecto pertenece la tarea
      type: mongoose.Schema.Types.ObjectId,
      ref: "Proyecto",
    },
    completado: {//Campo que especifica si la tarea ya ha sido realizada o no
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

/*Se crea un modelo de datos llamado Tarea utilizando el esquema tareaSchema. 
Este modelo se utilizará para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en la colección de proyectos en la base de datos MongoDB.*/

const Tarea = mongoose.model("Tarea", tareaSchema);
export default Tarea;
