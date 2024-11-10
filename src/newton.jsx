import React, { useState } from 'react';

function Newton() {
  const [funcion1, setFuncion1] = useState('x**2 + y**2 - 1'); // Función f1(x, y)
  const [funcion2, setFuncion2] = useState('y - x**2'); // Función f2(x, y)
  const [derivada1x, setDerivada1x] = useState('2*x'); // Derivada parcial f1 respecto a x
  const [derivada1y, setDerivada1y] = useState('2*y'); // Derivada parcial f1 respecto a y
  const [derivada2x, setDerivada2x] = useState('-2*x'); // Derivada parcial f2 respecto a x
  const [derivada2y, setDerivada2y] = useState('1'); // Derivada parcial f2 respecto a y
  const [aproximacionX, setAproximacionX] = useState(0.5); // Aproximación inicial para x
  const [aproximacionY, setAproximacionY] = useState(0.5); // Aproximación inicial para y
  const [numIteraciones, setNumIteraciones] = useState(3); // Número de iteraciones
  const [resultados, setResultados] = useState([]); // Resultados de las iteraciones
  const [error, setError] = useState(''); // Mensajes de error

  // Función para evaluar la expresión matemática
  const evaluarFuncion = (expresion, x, y) => {
    try {
      // Reemplazar ^ por ** (operador de potenciación en JS)
      expresion = expresion.replace(/\^/g, '**');
      return new Function('x', 'y', `return ${expresion}`).call(null, x, y);
    } catch (err) {
      setError('Error al evaluar la función');
      return NaN;
    }
  };

  // Función para ejecutar el método de Newton-Raphson
  const ejecutarNewtonRaphson = () => {
    setError(''); // Limpiar errores previos
    const iteraciones = [];
    let x = parseFloat(aproximacionX);
    let y = parseFloat(aproximacionY);

    for (let i = 0; i < numIteraciones; i++) {
      // Evaluar las funciones f1 y f2 en el punto (x, y)
      const f1x = evaluarFuncion(funcion1, x, y);
      const f2x = evaluarFuncion(funcion2, x, y);

      // Evaluar las derivadas parciales
      const df1dx = evaluarFuncion(derivada1x, x, y);
      const df1dy = evaluarFuncion(derivada1y, x, y);
      const df2dx = evaluarFuncion(derivada2x, x, y);
      const df2dy = evaluarFuncion(derivada2y, x, y);

      if (isNaN(f1x) || isNaN(f2x) || isNaN(df1dx) || isNaN(df1dy) || isNaN(df2dx) || isNaN(df2dy)) {
        setError('Error en la evaluación de funciones o derivadas');
        return;
      }

      // Matriz jacobiana
      const jacobiana = [
        [df1dx, df1dy],
        [df2dx, df2dy],
      ];

      // Determinante de la matriz jacobiana
      const determinante = jacobiana[0][0] * jacobiana[1][1] - jacobiana[0][1] * jacobiana[1][0];
      if (determinante === 0) {
        setError('Error: El determinante de la matriz jacobiana es 0.');
        return;
      }

      // Resolver el sistema de ecuaciones
      const deltaX = (f1x * jacobiana[1][1] - f2x * jacobiana[0][1]) / determinante;
      const deltaY = (-f1x * jacobiana[1][0] + f2x * jacobiana[0][0]) / determinante;

      // Actualizar las aproximaciones
      x = x - deltaX;
      y = y - deltaY;

      iteraciones.push({ iteracion: i + 1, valorX: x.toFixed(6), valorY: y.toFixed(6) });
    }

    setResultados(iteraciones);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Método de Newton-Raphson para Sistema de Ecuaciones</h2>

      <div>
        <h3>Ecuación 1</h3>
        <label>
          Función f1(x, y):
          <input
            type="text"
            value={funcion1}
            onChange={(e) => setFuncion1(e.target.value)}
            placeholder="Ej: x^2 + y^2 - 1"
            style={{ marginLeft: '10px', padding: '5px', width: '250px' }}
          />
        </label>
        <div>
          <label>
            Derivada parcial f1(x):
            <input
              type="text"
              value={derivada1x}
              onChange={(e) => setDerivada1x(e.target.value)}
              placeholder="Ej: 2*x"
              style={{ marginLeft: '10px', padding: '5px', width: '200px' }}
            />
          </label>
          <label>
            Derivada parcial f1(y):
            <input
              type="text"
              value={derivada1y}
              onChange={(e) => setDerivada1y(e.target.value)}
              placeholder="Ej: 2*y"
              style={{ marginLeft: '10px', padding: '5px', width: '200px' }}
            />
          </label>
        </div>
      </div>

      <div>
        <h3>Ecuación 2</h3>
        <label>
          Función f2(x, y):
          <input
            type="text"
            value={funcion2}
            onChange={(e) => setFuncion2(e.target.value)}
            placeholder="Ej: y - x^2"
            style={{ marginLeft: '10px', padding: '5px', width: '250px' }}
          />
        </label>
        <div>
          <label>
            Derivada parcial f2(x):
            <input
              type="text"
              value={derivada2x}
              onChange={(e) => setDerivada2x(e.target.value)}
              placeholder="Ej: -2*x"
              style={{ marginLeft: '10px', padding: '5px', width: '200px' }}
            />
          </label>
          <label>
            Derivada parcial f2(y):
            <input
              type="text"
              value={derivada2y}
              onChange={(e) => setDerivada2y(e.target.value)}
              placeholder="Ej: 1"
              style={{ marginLeft: '10px', padding: '5px', width: '200px' }}
            />
          </label>
        </div>
      </div>

      <div>
        <label>
          Aproximación inicial (x):
          <input
            type="number"
            value={aproximacionX}
            onChange={(e) => setAproximacionX(parseFloat(e.target.value))}
            style={{ marginLeft: '10px', padding: '5px', width: '100px' }}
          />
        </label>

        <label>
          Aproximación inicial (y):
          <input
            type="number"
            value={aproximacionY}
            onChange={(e) => setAproximacionY(parseFloat(e.target.value))}
            style={{ marginLeft: '10px', padding: '5px', width: '100px' }}
          />
        </label>

        <label>
          Número de Iteraciones:
          <input
            type="number"
            value={numIteraciones}
            onChange={(e) => setNumIteraciones(parseInt(e.target.value) || 1)}
            style={{ marginLeft: '10px', padding: '5px', width: '100px' }}
          />
        </label>

        <button onClick={ejecutarNewtonRaphson} style={{ marginLeft: '10px', padding: '10px 20px', cursor: 'pointer' }}>
          Ejecutar Newton-Raphson
        </button>
      </div>

      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

      <div style={{ marginTop: '20px' }}>
        <h3>Resultados</h3>
        {resultados.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Iteración</th>
                <th>X</th>
                <th>Y</th>
              </tr>
            </thead>
            <tbody>
              {resultados.map((iter, index) => (
                <tr key={index}>
                  <td>{iter.iteracion}</td>
                  <td>{iter.valorX}</td>
                  <td>{iter.valorY}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay resultados aún.</p>
        )}
      </div>
    </div>
  );
}

export default Newton;
