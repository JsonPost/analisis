import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Jacobi from '../src/jacobi'
import Gauss from '../src/gauss'
import Newton from '../src/newton'

const Home = () => {
  return <Jacobi/>;
};

const About = () => {
  return <Gauss/>;
};

const Newto = () => {
  return <Newton/>;
};




const App = () => {
  return (
    <Router>
      <div className="container">
        <div className="menu">
          <div className="menu-item">
            <a href="/Jacobi" className="menu-link">Metodo  Jacobi</a>
          </div>
          <div className="menu-item">
            <a href="/Gauss seidel" className="menu-link">Metodo Gauss seidel</a>
          </div>
          <div className="menu-item">
            <a href="/Newton" className="menu-link">Metodo Newton-Raphson</a>
          </div>
        </div>

        <Routes>
          <Route path="/Jacobi" element={<Home />} />
          <Route path="/Gauss seidel" element={<About />} />
          <Route path="/Newton" element={<Newto />} />
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
