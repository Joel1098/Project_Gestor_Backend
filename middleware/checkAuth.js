import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

/*
Verifica y decodifica el token de jwt en cada una de las solicitudes entrantes
autenticar al usuario, si es correcto lo asigna a req.usuario para utilizar en
otras rutas
*/
const checkAuth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //Obtiene token
      token = req.headers.authorization.split(" ")[1];

      //Decodifica token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //Recupera usuario
      req.usuario = await Usuario.findById(decoded.id).select(
        "-password -confirmado -token -createdAt -updatedAt -__v"
      );

      return next();
    } catch (error) {
      //Manda un error, en caso de lo del try salga mal
      return res.status(404).json({ msg: "Hubo un error" });
    }
  }

  //Error de token invalido.
  if (!token) {
    const error = new Error("Token no válido");
    return res.status(401).json({ msg: error.message });
  }

  next();
};

export default checkAuth;
