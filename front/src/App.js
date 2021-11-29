import './App.css';

function App() {
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
        <aside>
          <h1>Enrique Sánchez Llamas</h1>
          <h2>Desarrollador Web</h2>
        </aside>
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
        <section id='estudios' className='cuadroInstituciones'>
          <h1>Formación</h1>
          <div>
            <article className='cuadroEstudio'>
              <img src='logo192.png' alt='estudio1' />
              <h1>Título</h1>
              <h2>Institución</h2>
              <button>Ver más</button>
            </article>
            <article className='cuadroEstudio'>
              <img src='logo192.png' alt='estudio1' />
              <h1>Título</h1>
              <h2>Institución</h2>
              <button>Ver más</button>
            </article>
            <article className='cuadroEstudio'>
              <img src='logo192.png' alt='estudio1' />
              <h1>Título</h1>
              <h2>Institución</h2>
              <button>Ver más</button>
            </article>
            <article className='cuadroEstudio'>
              <img src='logo192.png' alt='estudio1' />
              <h1>Título</h1>
              <h2>Institución</h2>
              <button>Ver más</button>
            </article>
          </div>
        </section>
        <section id='experiencia' className='cuadroInstituciones'>
          <h1>Experiencia</h1>
          <div>
            <article className='cuadroEstudio'>
              <img src='logo192.png' alt='estudio1' />
              <h1>Título</h1>
              <h2>Institución</h2>
              <button>Ver más</button>
            </article>
            <article className='cuadroEstudio'>
              <img src='logo192.png' alt='estudio1' />
              <h1>Título</h1>
              <h2>Institución</h2>
              <button>Ver más</button>
            </article>
            <article className='cuadroEstudio'>
              <img src='logo192.png' alt='estudio1' />
              <h1>Título</h1>
              <h2>Institución</h2>
              <button>Ver más</button>
            </article>
            <article className='cuadroEstudio'>
              <img src='logo192.png' alt='estudio1' />
              <h1>Título</h1>
              <h2>Institución</h2>
              <button>Ver más</button>
            </article>
          </div>
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
