const getDB = require('../../BD/getDB');

const estudios = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const [estudios] = await connection.query(`
    SELECT * FROM estudios
    `);

    res.send({
      status: 'ok',
      estudios,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = estudios;
