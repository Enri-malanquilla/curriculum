const getDB = require('./getDB');

async function main() {
  let connection;

  try {
    connection = await getDB();

    await connection.query('DROP TABLE IF EXISTS fotos');
    await connection.query('DROP TABLE IF EXISTS usuario');
    await connection.query('DROP TABLE IF EXISTS instituciones');
    await connection.query('DROP TABLE IF EXISTS experiencia');
    await connection.query('DROP TABLE IF EXISTS estudios');
    await connection.query('DROP TABLE IF EXISTS otros');

    console.log('tablas borradas, comienza el reinicio');

    //TABLA USUARIO
    await connection.query(
      `
        CREATE TABLE usuario (
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(512) NOT NULL,
            nombre VARCHAR(100),
            apellidos VARCHAR(100),
            github VARCHAR(100),
            linkdin VARCHAR(100),
            instagram VARCHAR(100),
            facebook VARCHAR(100),
            puesto VARCHAR(100)
            
        )
        `
    );
    console.log('Iniciada tabla usuario');

    //TABLA INSTITUCIONES

    await connection.query(
      `
        CREATE TABLE instituciones (
            id INT PRIMARY KEY AUTO_INCREMENT,
            nombre VARCHAR(100) NOT NULL
            
        )
        `
    );
    console.log('Iniciada tabla instituciones');
  } catch (error) {
    console.error(error.message);
  } finally {
    if (connection) connection.release();
    process.exit(0);
  }
}

main();
