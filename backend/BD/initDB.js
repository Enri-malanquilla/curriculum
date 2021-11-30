const getDB = require('./getDB');
require('dotenv').config();
const { USUARIO, CONTRASENA } = process.env;
const faker = require('faker/locale/es');
//formato fecha
const { format } = require('date-fns');
function formatDate(date) {
  return format(date, 'yyyy-MM-dd HH:mm:ss');
}

async function main() {
  let connection;

  try {
    connection = await getDB();

    await connection.query('DROP TABLE IF EXISTS fotos');
    await connection.query('DROP TABLE IF EXISTS usuario');
    await connection.query('DROP TABLE IF EXISTS experiencia');
    await connection.query('DROP TABLE IF EXISTS estudios');
    await connection.query('DROP TABLE IF EXISTS otros');
    await connection.query('DROP TABLE IF EXISTS instituciones');

    console.log('tablas borradas, comienza el reinicio');

    //TABLA USUARIO
    await connection.query(
      `
        CREATE TABLE usuario (
            email VARCHAR(100) UNIQUE NOT NULL,
            alias VARCHAR(512) NOT NULL,
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

    await connection.query(`
    CREATE TABLE experiencia (
        id INT PRIMARY KEY AUTO_INCREMENT ,
        idEmpresa INT NOT NULL,
        FOREIGN KEY (idEmpresa) REFERENCES instituciones(id),
        puesto VARCHAR(100) NOT NULL,
        descripcion TEXT,
        fechaInicio DATETIME NOT NULL,
        fechaFinal DATETIME,
        actual BOOLEAN DEFAULT false
    )
    `);
    console.log(`Iniciada tabla experiencia`);

    await connection.query(`
    CREATE TABLE estudios(
        id INT PRIMARY KEY AUTO_INCREMENT,
        idEmpresa INT NOT NULL,
        FOREIGN KEY (idEmpresa) REFERENCES instituciones(id),
        nota INT,
        apto BOOLEAN DEFAULT true NOT NULL,
        temario TEXT
        

    )
    `);

    console.log('Iniciada tabla estudios');

    await connection.query(`
    CREATE TABLE otros (
        id INT PRIMARY KEY AUTO_INCREMENT PRIMARY KEY,
        titulo VARCHAR(100) NOT NULL,
        descripcion TEXT,
        web BOOLEAN DEFAULT false,
        enlace TEXT,
        enlace2 TEXT,
        enlace3 TEXT


        
    )
    `);

    console.log('Iniciada tabla otros');

    await connection.query(`
    CREATE TABLE fotos (
        id INT PRIMARY KEY AUTO_INCREMENT,
        idEmpresa INT NOT NULL,
        FOREIGN KEY (idEmpresa) REFERENCES instituciones(id),
        idOtros INT NOT NULL,
        FOREIGN KEY (idOtros) REFERENCES otros(id),
        name VARCHAR(50) NOT NULL

    )
    `);
    console.log('Iniciada tabla fotos');

    /*
    #########################
    ###### CREAR USUARIO ####
    #########################
    */

    await connection.query(`
    INSERT INTO usuario (email, alias, password, nombre, apellidos, github, linkdin, puesto)
    VALUES (
        "enri.sl.malanquilla@gmail.com",
        SHA2("${USUARIO}", 512),
        SHA2("${CONTRASENA}", 512),
        "enrique",
        "sanchez llamas",
        "https://github.com/Enri-malanquilla",
        "https://www.linkedin.com/in/enriquesanchezmalanquilla/",
        "Desarrollador web"
    )
    `);
    console.log('Usuario creado');

    /*
    ###############################
    ###### CREAR PRIMERA COLUMNA###
    ###############################
    */

    for (let i = 1; i < 4; i++) {
      const nombreCompania = faker.company.companyName();
      const puesto = faker.commerce.productName();
      const descripcion = faker.commerce.productDescription();
      const nota = Math.random() * 9;
      const url = faker.internet.url();

      await connection.query(`
        INSERT INTO instituciones ( nombre)
        VALUES (
            "${nombreCompania}"
        )
        `);
      console.log('Creada institución');

      await connection.query(`
        INSERT INTO experiencia (idEmpresa, puesto, descripcion, fechaInicio)
        VALUES (
            '${i}',
            '${puesto}',
            '${descripcion}',
            '${formatDate(new Date())}'
        )
        `);
      console.log('Creado experiencia');

      await connection.query(`
        INSERT INTO estudios (idEmpresa, nota, temario)
        VALUES (
            "${i}",
            "${nota}",
            "${descripcion}"
        )
        `);
      console.log('Creado estudios');

      await connection.query(`
        INSERT INTO otros (titulo, descripcion, enlace)
        VALUES(
            "${puesto}",
            "${descripcion}",
            "${url}"
        )
        `);

      console.log('Creado estudios');
    }
  } catch (error) {
    console.error(error.message);
  } finally {
    if (connection) connection.release();
    process.exit(0);
  }
}

main();
