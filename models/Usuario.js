/*En este bloque, se importan los módulos mongoose para interactuar con la base de datos MongoDB 
y bcrypt para el cifrado de contraseñas. */
import mongoose from "mongoose";
import bcrypt from "bcrypt";

/*En este bloque, se define el esquema del usuario utilizando el método mongoose.Schema(). 
Se especifican los campos del usuario, como nombre, password, email, token y confirmado. 
Además, se configura el esquema para que tenga marcas de tiempo (timestamps). */
const usuarioSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    token: {
      type: String,
    },
    confirmado: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

/*Este bloque define un middleware que se ejecuta antes de guardar el usuario en la base de datos. 
Se utiliza bcrypt para generar un hash de la contraseña del usuario antes de almacenarla en la base de datos. 
La función next() se llama para pasar el control al siguiente middleware o proceso. */
usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


/*En este bloque, se define un método comprobarPassword en el esquema del usuario. Este método se utiliza para comparar la contraseña proporcionada por el usuario con la contraseña almacenada en la base de datos. 
Utiliza bcrypt.compare() para realizar esta comparación y devuelve un valor booleano indicando si las contraseñas coinciden o no.*/
usuarioSchema.methods.comprobarPassword = async function (passwordFormulario) {
  return await bcrypt.compare(passwordFormulario, this.password);
};

/*Finalmente, se crea el modelo de usuario utilizando el esquema definido anteriormente. 
El modelo se exporta para que pueda ser utilizado en otras partes de la aplicación. Este modelo 
se utilizará para realizar operaciones CRUD (crear, leer, actualizar y eliminar) en la colección de usuarios de la base de datos MongoDB. */
const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario;
