//Express para el routeo de la API
import express from "express";
//Recupera métodos controladores de Tareas y manejar sus solicitudes HTTP
import {
  agregarTarea,
  obtenerTarea,
  actualizarTarea,
  eliminarTarea,
  cambiarEstado,
} from "../controllers/tareaController.js";

//Recupera el checkAuth.js para las autenticaciones
import checkAuth from "../middleware/checkAuth.js";

//Crea objeto Router de express
const router = express.Router();
//Ruteo para agregar tarea con método HTTP POST
router.post("/", checkAuth, agregarTarea);

//Configuración ruta con parametro de id
//obtenerTarea con método GET
//actualizarTarea con método PUT
//eliminarTarea con método DELTE
router
  .route("/:id")
  .get(checkAuth, obtenerTarea)
  .put(checkAuth, actualizarTarea)
  .delete(checkAuth, eliminarTarea);

//Configura una ruta para cambiar el estado de una tarea específica utilizando su id
router.post("/estado/:id", checkAuth, cambiarEstado);
//Permite su uso en otros lados.
export default router;
