//Biblioteca para trabajar con tokens
import jwt from "jsonwebtoken";
/*
Recibe como parametro id y genera un token de acuerdo a ella,
id es la firma, y se recupera la llave secreta de JWT_SECRET,
haciendo que expire en 30 dias, permite autenticar usuarios
*/
const generarJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
//Permite su uso en otros lados.
export default generarJWT;
