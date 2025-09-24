import { useState } from 'react';
import DuckCard from './components/DuckCard';
import ducksData from './data/ducks.json';
import './App.css';

function App() {
  const [ducks, setDucks] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadDucks = () => {
    setLoading(true);
    // Simular una carga asíncrona
    setTimeout(() => {
      setDucks(ducksData);
      setLoading(false);
    }, 1000);
  };

  const clearDucks = () => {
    setDucks([]);
  };

  return (
<<<<<<< HEAD
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR- Hola mundo!
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
=======
    <div className="app">
      <header className="app-header">
        <h1>🦆 Enciclopedia de Patos</h1>
        <p>Descubre las diferentes especies de patos del mundo</p>
      </header>

      <main className="app-main">
        <div className="controls">
          <button
            onClick={loadDucks}
            disabled={loading}
            className="load-button"
          >
            {loading ? 'Cargando...' : 'Cargar Patos'}
          </button>

          {ducks.length > 0 && (
            <button onClick={clearDucks} className="clear-button">
              Limpiar Lista
            </button>
          )}
        </div>

        {loading && <div className="loading">🦆 Buscando patos...</div>}

        <div className="ducks-grid">
          {ducks.map((duck) => (
            <DuckCard key={duck.id} duck={duck} />
          ))}
        </div>

        {ducks.length === 0 && !loading && (
          <div className="empty-state">
            <p>
              Haz clic en &quot;Cargar Patos&quot; para ver las especies
              disponibles
            </p>
          </div>
        )}
      </main>
    </div>
>>>>>>> 5c0175c7f90efd28459c5a411280c02afe301962
  );
}

export default App;
