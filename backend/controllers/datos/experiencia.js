const getDB = require('../../BD/getDB');

const experiencia = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const [experiencia] = await connection.query(`
    SELECT * FROM experiencia
    `);

    res.send({
      status: 'ok',
      experiencia,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = experiencia;
