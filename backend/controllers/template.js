const getDB = require('../../../BD/getDB');

const getUsuario = async (req, res, next) => {
  let connection;

  try {
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getUsuario;
