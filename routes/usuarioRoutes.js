/*En este bloque, se importa el módulo express y se crea un objeto router para gestionar las rutas de la aplicación.*/
import express from "express";
const router = express.Router();

/*En este bloque, se importan las funciones de los controladores que manejarán las solicitudes y 
los middlewares que se utilizarán en las rutas. 
usuarioController.js contiene las funciones para el registro, autenticación, confirmación, restablecimiento de contraseña, 
comprobación de token y perfil del usuario. 
checkAuth.js es un middleware que se utilizará para verificar la autenticación del usuario. */
import {
  registrar,
  autenticar,
  confirmar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  perfil,
} from "../controllers/usuarioController.js";

import checkAuth from "../middleware/checkAuth.js";

/*En este bloque, se definen las rutas de la aplicación utilizando el objeto router. Las rutas se asocian a las funciones de los controladores y a los middlewares correspondientes:
  POST /: Se utiliza para registrar un nuevo usuario.
  POST /login: Se utiliza para autenticar a un usuario.
  GET /confirmar/:token: Se utiliza para confirmar la cuenta del usuario a través del token proporcionado.
  POST /olvide-password: Se utiliza para solicitar un correo electrónico de restablecimiento de contraseña.
  GET /olvide-password/:token: Se utiliza para verificar si un token de restablecimiento de contraseña es válido.
  POST /olvide-password/:token: Se utiliza para establecer una nueva contraseña después de la verificación del token.
  GET /perfil: Se utiliza para obtener el perfil del usuario autenticado. 
  El middleware checkAuth se utiliza para verificar la autenticación del usuario antes de permitir el acceso a esta ruta. */
router.post("/", registrar); // Crea un nuevo usuario
router.post("/login", autenticar);
router.get("/confirmar/:token", confirmar);
router.post("/olvide-password", olvidePassword);
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);
router.get("/perfil", checkAuth, perfil);

export default router;
