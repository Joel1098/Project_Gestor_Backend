//Express para el routeo de la API
import express from "express";
//Recupera métodos controladores de Proyecto y manejar sus solicitues HTTP
import {
  obtenerProyectos,
  nuevoProyecto,
  obtenerProyecto,
  editarProyecto,
  eliminarProyecto,
  buscarColaborador,
  agregarColaborador,
  eliminarColaborador,
} from "../controllers/proyectoController.js";
//Recupera el checkAuth.js para las autenticaciones
import checkAuth from "../middleware/checkAuth.js";

//Crea objeto Router de express
const router = express.Router();

//Configura las rutas en raiz para 
//obtenerProyectos método GET porque consulta
//nuevoProyecto método POST para crear uno nuevo
router
  .route("/")
  .get(checkAuth, obtenerProyectos)
  .post(checkAuth, nuevoProyecto);

//Rutea métodos que necesitan id como parametro.
//obtenerProyecto consulta proyecto por ID con método HTTP GET
//editarProyecto edita proyecto por ID con método HTTP PUT
//eliminarProyecto elimina proyecto por ID con método HTTP DELETE
router
  .route("/:id")
  .get(checkAuth, obtenerProyecto)
  .put(checkAuth, editarProyecto)
  .delete(checkAuth, eliminarProyecto);

//Configura ruta para buscar colaboradores en un proyecto 
//con buscarColaborador y método HTTP POST
router.post("/colaboradores", checkAuth, buscarColaborador);
//Ruteo para agregar colaborador a proyecto mediante ID con método HTTP POST
router.post("/colaboradores/:id", checkAuth, agregarColaborador);
//Ruteo para eliminar colaborador a proyecto mediante ID con método HTTP POST
router.post("/eliminar-colaborador/:id", checkAuth, eliminarColaborador);

export default router;
