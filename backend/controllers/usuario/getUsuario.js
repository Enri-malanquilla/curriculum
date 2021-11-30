const getDB = require('../../BD/getDB');

const getUsuario = async (req, res, next) => {
  let connection;

  try {
    //Petición al servidor
    connection = await getDB();

    const [usuario] = await connection.query(`
      SELECT email, nombre, apellidos, github, linkdin, instagram, facebook, puesto
      FROM usuario
      `);

    const infoUsuario = {
      email: usuario[0].email,
      nombre: usuario[0].nombre,
      apellidos: usuario[0].apellidos,
      github: usuario[0].github,
      linkdin: usuario[0].linkdin,
      instagram: usuario[0].instagram,
      facebook: usuario[0].facebook,
      puesto: usuario[0].puesto,
    };

    res.send({
      status: 'ok',
      infoUsuario,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getUsuario;
