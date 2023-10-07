//En este bloque, se importa el módulo nodemailer, que permite enviar correos electrónicos desde Node.js.
import nodemailer from "nodemailer";

/*Esta función toma un objeto datos que incluye el email, nombre y token del usuario registrado. 
Crea un transporte de nodemailer con la configuración del servidor de correo electrónico proporcionada en las variables de entorno. 
Luego, utiliza este transporte para enviar un correo electrónico de confirmación al usuario. */
export const emailRegistro = async (datos) => {
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Información del email

  const info = await transport.sendMail({
    from: '"UpTask - Administrador de Proyectos" <cuentas@uptask.com>',
    to: email,
    subject: "UpTask - Comprueba tu cuenta",
    text: "Comprueba tu cuenta en UpTask",
    html: `<p>Hola: ${nombre} Comprueba tu cuenta en UpTask</p>
    <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace: 

    <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>
    
    <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
    
    
    `,
  });
};


/*Esta función tiene un propósito similar a emailRegistro, 
pero se utiliza para enviar correos electrónicos de restablecimiento de contraseña. 
Al igual que en la función anterior, desestructura los datos, configura el transporte de nodemailer y envía el correo electrónico 
con el enlace para restablecer la contraseña.
En ambas funciones, el contenido del correo electrónico se compone de un mensaje de saludo personalizado, 
un enlace a una página específica de la aplicación y una nota de que el correo electrónico puede ser ignorado si el usuario no solicitó la acción correspondiente.
Estas funciones utilizan las variables de entorno (process.env.EMAIL_HOST, process.env.EMAIL_PORT, process.env.EMAIL_USER, process.env.EMAIL_PASS, process.env.FRONTEND_URL) para obtener la información de configuración y los enlaces relevantes, lo que permite una mayor flexibilidad y seguridad en la configuración de la aplicación. */
export const emailOlvidePassword = async (datos) => {
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Información del email

  const info = await transport.sendMail({
    from: '"UpTask - Administrador de Proyectos" <cuentas@uptask.com>',
    to: email,
    subject: "UpTask - Reestablece tu Password",
    text: "Reestablece tu Password",
    html: `<p>Hola: ${nombre} has solicitado reestablecer tu password</p>

    <p>Sigue el siguiente enlace para generar un nuevo password: 

    <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Password</a>
    
    <p>Si tu no solicitaste este email, puedes ignorar el mensaje</p>
    
    
    `,
  });
};
