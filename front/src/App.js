import './App.css';
import React, { useState, useEffect } from 'react';
import { get } from './api/get';
// require('dotenv').config

function App() {
  const { REACT_APP_HOST, REACT_APP_PORT } = process.env;
  const [usuario, setUsuario] = useState();
  const [experiencia, setExperiencia] = useState();
  const [estudios, setEstudios] = useState();
  const [otros, setOtros] = useState();
  const [instituciones, setInstituciones] = useState();

  useEffect(() => {
    get(`${REACT_APP_HOST}${REACT_APP_PORT}/usuario`, (body) => {
      setUsuario(body.infoUsuario);
    });
    get(`${REACT_APP_HOST}${REACT_APP_PORT}/experiencia`, (body) => {
      setExperiencia(body.experiencia);
    });
    get(`${REACT_APP_HOST}${REACT_APP_PORT}/estudios`, (body) => {
      setEstudios(body.estudios);
    });
    get(`${REACT_APP_HOST}${REACT_APP_PORT}/otros`, (body) => {
      setOtros(body.otros);
    });
    get(`${REACT_APP_HOST}${REACT_APP_PORT}/instituciones`, (body) => {
      setInstituciones(body.instituciones);
    });
  }, [REACT_APP_HOST, REACT_APP_PORT]);

  console.log(otros);

  const encontrarEmpresa = (estudioExperiencia, instituciones) => {
    const nombreEmpresa = instituciones.find(
      (empresa) => Number(empresa.id) === estudioExperiencia
    );
    return nombreEmpresa.nombre;
  };

  const mostrarMas = (e) => {
    return (
      <section className='otros'>
        <article>
          <img src='logo192.png' alt='estudio1' />
        </article>
      </section>
    );
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <figure>
          <img
            src='fotoPerfil.jpeg'
            className='App-logo'
            alt='Enrique Sánchez'
          />
        </figure>
        {usuario && (
          <aside>
            <h1>
              {usuario.nombre} {usuario.apellidos}
            </h1>
            <h2>{usuario.puesto}</h2>
          </aside>
        )}
      </header>
      <main>
        <section id='datosPersonales'>
          <nav>
            <ul>
              <li>Carta de Presentación</li>
              <li>Contacto</li>
              <li>Descargar</li>
              <li>Contacto</li>
            </ul>
          </nav>
        </section>
        <h1>Formación</h1>
        <section id='estudios' className='cuadroInstituciones'>
          {estudios &&
            instituciones &&
            estudios.map((materia) => {
              return (
                <div key={materia.id}>
                  <article className='cuadroEstudio'>
                    <img src='logo192.png' alt='estudio1' />
                    <h1>{materia.titulo}</h1>
                    <h2>
                      {encontrarEmpresa(materia.idEmpresa, instituciones)}
                    </h2>
                    <button>Ver más</button>
                  </article>
                </div>
              );
            })}
        </section>
        <h1>Experiencia</h1>
        <section id='experiencia' className='cuadroInstituciones'>
          {experiencia &&
            instituciones &&
            experiencia.map((empresa) => {
              return (
                <div key={empresa.id}>
                  <article className='cuadroEstudio'>
                    <img src='logo192.png' alt='estudio1' />
                    <h1>{empresa.nombre}</h1>
                    <h2>
                      {encontrarEmpresa(empresa.idEmpresa, instituciones)}
                    </h2>
                    <button>Ver más</button>
                  </article>
                </div>
              );
            })}
        </section>
        <aside>
          <button id='masInfo'>Más info</button>
        </aside>
      </main>
      <footer>
        <figure>
          <img src='linkdin.png' alt='red' />
        </figure>
        <figure>
          <img src='logo192.png' alt='red' />
        </figure>
        <figure>
          <img src='logo192.png' alt='red' />
        </figure>
      </footer>
    </div>
  );
}

export default App;
