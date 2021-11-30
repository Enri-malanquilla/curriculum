const getDB = require('../../BD/getDB');

const otros = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const [otros] = await connection.query(`
    SELECT * FROM otros
    `);

    res.send({
      status: 'ok',
      otros,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = otros;
