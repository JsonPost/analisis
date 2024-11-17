import React, { useState } from 'react';

function Biseccion() {
  const [funcion, setFuncion] = useState("x * sin(x) - 1"); // Función a resolver
  const [an, setAn] = useState(0); // Límite inferior inicial
  const [bn, setBn] = useState(2); // Límite superior inicial
  const [numIteraciones, setNumIteraciones] = useState(10); // Número de iteraciones
  const [resultados, setResultados] = useState([]); // Resultados de las iteraciones
  const [error, setError] = useState(""); // Mensaje de error

  // Función para traducir notación matemática a JavaScript
  const traducirFuncion = (expresion) => {
    return expresion
      .replace(/\^/g, "**") // Reemplazar potencias
      .replace(/sin\(/g, "Math.sin(") // Reemplazar sin por Math.sin
      .replace(/cos\(/g, "Math.cos(") // Reemplazar cos por Math.cos
      .replace(/tan\(/g, "Math.tan(") // Reemplazar tan por Math.tan
      .replace(/log\(/g, "Math.log(") // Reemplazar log por Math.log
      .replace(/sqrt\(/g, "Math.sqrt(") // Reemplazar sqrt por Math.sqrt
      .replace(/pi/g, "Math.PI") // Reemplazar pi por Math.PI
      .replace(/e/g, "Math.E"); // Reemplazar e por Math.E
  };

  // Función para evaluar la expresión matemática
  const evaluarFuncion = (expresion, x) => {
    try {
      const funcionTraducida = traducirFuncion(expresion);
      return new Function("x", `return ${funcionTraducida}`).call(null, x);
    } catch (err) {
      setError("Error al evaluar la función");
      return NaN;
    }
  };

  // Función para ejecutar el método de bisección
  const ejecutarBiseccion = () => {
    setError(""); // Limpiar errores previos
    const iteraciones = [];
    let a = parseFloat(an); // Cambiar a let
    let b = parseFloat(bn); // Cambiar a let

    // Validar que a y b sean diferentes y que haya un cambio de signo en f(a) y f(b)
    let fa = evaluarFuncion(funcion, a);
    let fb = evaluarFuncion(funcion, b);
    if (isNaN(fa) || isNaN(fb)) {
      setError("Error: No se pudo evaluar la función en los límites iniciales.");
      return;
    }
    if (fa * fb >= 0) {
      setError(
        "Error: La función debe cambiar de signo en el intervalo inicial [a, b]."
      );
      return;
    }

    // Realizar iteraciones del método de bisección
    for (let i = 0; i < numIteraciones; i++) {
      const xn = (a + b) / 2; // Punto medio
      const fxn = evaluarFuncion(funcion, xn);

      iteraciones.push({
        iteracion: i + 1,
        an: a.toFixed(4),
        xn: xn.toFixed(4),
        bn: b.toFixed(4),
        fan: fa.toFixed(4),
        fxn: fxn.toFixed(4),
        fbn: fb.toFixed(4),
      });

      // Decidir el nuevo intervalo
      if (fa * fxn < 0) {
        b = xn; // El cambio de signo está entre a y xn
        fb = fxn;
      } else {
        a = xn; // El cambio de signo está entre xn y b
        fa = fxn;
      }
    }

    setResultados(iteraciones);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Método de Bisección</h2>
      <div>
        <label>
          Ecuación (f(x)):
          <input
            type="text"
            value={funcion}
            onChange={(e) => setFuncion(e.target.value)}
            placeholder="Ej: x * sin(x) - 1"
            style={{ marginLeft: "10px", padding: "5px", width: "300px" }}
          />
        </label>
      </div>
      <div>
        <label>
          Límite inferior (a):
          <input
            type="number"
            value={an}
            onChange={(e) => setAn(e.target.value)}
            style={{ marginLeft: "10px", padding: "5px", width: "100px" }}
          />
        </label>
        <label>
          Límite superior (b):
          <input
            type="number"
            value={bn}
            onChange={(e) => setBn(e.target.value)}
            style={{ marginLeft: "10px", padding: "5px", width: "100px" }}
          />
        </label>
      </div>
      <div>
        <label>
          Número de Iteraciones:
          <input
            type="number"
            value={numIteraciones}
            onChange={(e) => setNumIteraciones(e.target.value)}
            style={{ marginLeft: "10px", padding: "5px", width: "100px" }}
          />
        </label>
        <button
          onClick={ejecutarBiseccion}
          style={{
            marginLeft: "10px",
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Ejecutar Bisección
        </button>
      </div>
      {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
      <div style={{ marginTop: "20px" }}>
        <h3>Resultados</h3>
        {resultados.length > 0 ? (
          <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th>n</th>
                <th>aₙ</th>
                <th>xₙ</th>
                <th>bₙ</th>
                <th>f(aₙ)</th>
                <th>f(xₙ)</th>
                <th>f(bₙ)</th>
              </tr>
            </thead>
            <tbody>
              {resultados.map((iter, index) => (
                <tr key={index}>
                  <td>{iter.iteracion}</td>
                  <td>{iter.an}</td>
                  <td>{iter.xn}</td>
                  <td>{iter.bn}</td>
                  <td>{iter.fan}</td>
                  <td>{iter.fxn}</td>
                  <td>{iter.fbn}</td>
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

export default Biseccion;
