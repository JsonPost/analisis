import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Jacobi from '../src/jacobi'
import Gauss from '../src/gauss'
import Newton from '../src/newton'
import Biseccion from '../src/biseccion'
import ReglaFalsaSimple from '../src/reglafalsa'
import MetodoPuntoFijo from '../src/puntofijo'

const App = () => {
  return (
    <Router>
      <div className="container">
        <h1>Metodos unidad 2</h1>
        <div className="menu">
          <div className="menu-item">
            <a href="/biseccion" className="menu-link"> Biseccion</a>
          </div>
          <div className="menu-item">
            <a href="/reglafalsa" className="menu-link"> Regla Falsa</a>
          </div>
          <div className="menu-item">
            <a href="/puntofijo" className="menu-link"> Regla punto fijo</a>
          </div>
        </div>
        <br></br>
        <h1>Metodos unidad 3</h1>
        <div className="menu">
          <div className="menu-item">
            <a href="/Jacobi" className="menu-link">Jacobi</a>
          </div>
          <div className="menu-item">
            <a href="/Gauss seidel" className="menu-link"> Gauss seidel</a>
          </div>
          <div className="menu-item">
            <a href="/Newton" className="menu-link">Newton-Raphson</a>
          </div>
        </div>

        <h1>Metodos unidad 4 proximamente</h1>
        

        <Routes>
          <Route path="/Jacobi" element={<Jacobi />} />
          <Route path="/Gauss seidel" element={<Gauss />} />
          <Route path="/Newton" element={<Newton />} />
          <Route path="/biseccion" element={<Biseccion />} />
          <Route path="/reglafalsa" element={<ReglaFalsaSimple />} />
          <Route path="/puntofijo" element={<MetodoPuntoFijo />} />
        </Routes>
      </div>
      <style jsx>{`
        .container {
          text-align: center;
          margin-top: 50px;
        }

        .menu {
          display: flex;
          justify-content: center;
          gap: 30px;
        }

        .menu-item {
          background-color: #4CAF50;
          border-radius: 8px;
          padding: 30px 60px;
          text-align: center;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .menu-item:hover {
          transform: scale(1.1);
        }

        .menu-link {
          color: white;
          font-size: 24px;
          text-decoration: none;
          font-weight: bold;
          transition: color 0.3s ease;
        }

        .menu-link:hover {
          color: #ffeb3b; /* Color dorado al hacer hover */
        }

        h2 {
          font-size: 36px;
          margin-top: 20px;
        }
      `}</style>
    </Router>
  );
};

export default App;
