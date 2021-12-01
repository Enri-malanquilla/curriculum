const getDB = require('../../BD/getDB');

const instituciones = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const [instituciones] = await connection.query(`
    SELECT * FROM instituciones
    `);

    res.send({
      status: 'ok',
      instituciones,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = instituciones;
