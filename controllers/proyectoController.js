import Proyecto from "../models/Proyecto.js";
import Usuario from "../models/Usuario.js";



/*Funcion para obtener los proyectos donde una vez que el usuario exista dentro del sistema
ingrese y quiera obtener algun proyecto que haya realizado, 
esta funcion asincrona nos permite consultar a la base de datos proyectos ya creados o bien existentes 
dentro de la cuenta en la que se ha ingresado*/
const obtenerProyectos = async (req, res) => {
  const proyectos = await Proyecto.find({
    $or: [
      { colaboradores: { $in: req.usuario } },
      { creador: { $in: req.usuario } },
    ],
  }).select("-tareas");
  res.json(proyectos);
};

/*Funcion dedicada a crear un nuevo proyecto el cual se guardara en la base de datos con el usuario y respondera a un identificador unico
para el creador del proyecto asi como tambien confirma de que se ha creado el proyecto exitosamente*/

const nuevoProyecto = async (req, res) => {
  const proyecto = new Proyecto(req.body);
  proyecto.creador = req.usuario._id;

  try {
    const proyectoAlmacenado = await proyecto.save();
    res.json(proyectoAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

/*Esta funcion es para obtener un proyecto en especifico donde el id tendra la funcion de buscarlo acorde al mismo identificador
que se le haya asignado de igual forma con diferentes parametros a considerar como su nombre e igual otras funcionalidades
como quien si y quien no puede acceder a buscar dicho proyecto, pero al final funciona de tal forma que 
haya tal comunicacion que concuerde tanto el usuario como el proyecto y en caso de que no encuentre dicho proyecto manda un error
de que no se ha encontrado*/
const obtenerProyecto = async (req, res) => {
  const { id } = req.params;

  const proyecto = await Proyecto.findById(id)
    .populate({
      path: "tareas",
      populate: { path: "completado", select: "nombre" },
    })
    .populate("colaboradores", "nombre email");

  if (!proyecto) {
    const error = new Error("No Encontrado");
    return res.status(404).json({ msg: error.message });
  }

  if (
    proyecto.creador.toString() !== req.usuario._id.toString() &&
    !proyecto.colaboradores.some(
      (colaborador) => colaborador._id.toString() === req.usuario._id.toString()
    )
  ) {
    const error = new Error("Acción No Válida");
    return res.status(401).json({ msg: error.message });
  }

  res.json(proyecto);
};

/*Tambien se pueden editar los proyectos que en este caso el objeto de proyecto los parametros a editar son nombre, descripcion, fecha y cliente
y con ello una vez efectuados los cambios se guarda o bien, se actualiza en la base de datos almacenando los nuevos datos del proyecto y al igual que en
otras funciones ya vistas, si el proyecto no se encuentra no se podra editar valga la redundancia asi como tambien el id del usuario debe de 
coincidir con el proyecto para que este pueda tener acceso a la edicion*/
const editarProyecto = async (req, res) => {
  const { id } = req.params;

  const proyecto = await Proyecto.findById(id);

  if (!proyecto) {
    const error = new Error("No Encontrado");
    return res.status(404).json({ msg: error.message });
  }

  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Acción No Válida");
    return res.status(401).json({ msg: error.message });
  }

  proyecto.nombre = req.body.nombre || proyecto.nombre;
  proyecto.descripcion = req.body.descripcion || proyecto.descripcion;
  proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega;
  proyecto.cliente = req.body.cliente || proyecto.cliente;

  try {
    const proyectoAlmacenado = await proyecto.save();
    res.json(proyectoAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

/*Al igual que en muchas otras aplicaciones tambien se puede eliminar el proyecto que por tanto mencionado
deben de coincidir el id del creador para acceder a dicha funcionalidad. La funcion solo consiste de 
utilizar un metodo para eliminar un solo proyecto en especifico lo cual envia a la base de datos, la actualiza 
y con ello deja de existir dicho proyecto, caso contrario solo arroja un error que el proyecto no ha 
podido eliminarse*/
const eliminarProyecto = async (req, res) => {
  const { id } = req.params;

  const proyecto = await Proyecto.findById(id);

  if (!proyecto) {
    const error = new Error("No Encontrado");
    return res.status(404).json({ msg: error.message });
  }

  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Acción No Válida");
    return res.status(401).json({ msg: error.message });
  }

  try {
    await proyecto.deleteOne();
    res.json({ msg: "Proyecto Eliminado" });
  } catch (error) {
    console.log(error);
  }
};

/*Esta funcion nos permite buscar un colaborador basado en su email haciendo la consulta a la base de datos 
y utilizando un metodo aplicado al objeto usuario que nos ayuda a realizar la busqueda 
de un usuario en especifico*/
const buscarColaborador = async (req, res) => {
  const { email } = req.body;
  const usuario = await Usuario.findOne({ email }).select(
    "-confirmado -createdAt -password -token -updatedAt -__v "
  );

  if (!usuario) {
    const error = new Error("Usuario no encontrado");
    return res.status(404).json({ msg: error.message });
  }

  res.json(usuario);
};

/*Nos permite agregar a un nuevo colaborador a nuestro proyecto siempre y cuando este exista al igual 
de requerir su email que igual debe existir en la base de datos para que pueda acceder al proyecto.
Pero lo peculiar de esta funcion es que especifica nuestra funcion si es el admin del proyecto ya que si lo es
no tiene sentido que sea colaborador, al igual que no puede agregarse a alguien que ya esta colaborando en el proyecto,
por lo que se crean varios condicionales dentro de nuestra funcion para validacion de que dicho usuario pueda
ingresar a nuestro proyecto*/
const agregarColaborador = async (req, res) => {
  const proyecto = await Proyecto.findById(req.params.id);

  if (!proyecto) {
    const error = new Error("Proyecto No Encontrado");
    return res.status(404).json({ msg: error.message });
  }

  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Acción no válida");
    return res.status(404).json({ msg: error.message });
  }

  const { email } = req.body;
  const usuario = await Usuario.findOne({ email }).select(
    "-confirmado -createdAt -password -token -updatedAt -__v "
  );

  if (!usuario) {
    const error = new Error("Usuario no encontrado");
    return res.status(404).json({ msg: error.message });
  }

  // El colaborador no es el admin del proyecto
  if (proyecto.creador.toString() === usuario._id.toString()) {
    const error = new Error("El Creador del Proyecto no puede ser colaborador");
    return res.status(404).json({ msg: error.message });
  }

  // Revisar que no este ya agregado al proyecto
  if (proyecto.colaboradores.includes(usuario._id)) {
    const error = new Error("El Usuario ya pertenece al Proyecto");
    return res.status(404).json({ msg: error.message });
  }

  // Esta bien, se puede agregar
  proyecto.colaboradores.push(usuario._id);
  await proyecto.save();
  res.json({ msg: "Colaborador Agregado Correctamente" });
};

/*Finalmente un caso similar a nuestra funcion de eliminar proyecto, procedemos a corroborar que 
el colaborador que queremos eliminar primero se encuentre el proyecto del que lo queremos eliminar
una vez que ese proyecto si exista, se corrobora que no sea el creador y en caso de que no lo sea
simplemente se elimina de nuestro proyecto que hayamos seleccionado con un metodo de JavaScript*/
const eliminarColaborador = async (req, res) => {
  const proyecto = await Proyecto.findById(req.params.id);

  if (!proyecto) {
    const error = new Error("Proyecto No Encontrado");
    return res.status(404).json({ msg: error.message });
  }

  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Acción no válida");
    return res.status(404).json({ msg: error.message });
  }

  // Esta bien, se puede eliminar
  proyecto.colaboradores.pull(req.body.id);
  await proyecto.save();
  res.json({ msg: "Colaborador Eliminado Correctamente" });
};

/*Funciones que se exportan a otros archivos dentro de nuestro backend*/
export {
  agregarColaborador,
  buscarColaborador,
  editarProyecto,
  eliminarColaborador,
  eliminarProyecto,
  nuevoProyecto,
  obtenerProyecto,
  obtenerProyectos
};

