import React, { useState } from "react";
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";

function Biseccion() {
  const [funcion, setFuncion] = useState("x * sin(x) - 1"); // Función a resolver
  const [an, setAn] = useState(0); // Límite inferior inicial
  const [bn, setBn] = useState(2); // Límite superior inicial
  const [numIteraciones, setNumIteraciones] = useState(10); // Número de iteraciones
  const [resultados, setResultados] = useState([]); // Resultados de las iteraciones
  const [error, setError] = useState(""); // Mensaje de error
  const [datosGrafica, setDatosGrafica] = useState(null); // Datos para la gráfica

  // Función para traducir notación matemática a JavaScript
  const traducirFuncion = (expresion) => {
    return expresion
      .replace(/\^/g, "**")
      .replace(/sin\(/g, "Math.sin(")
      .replace(/cos\(/g, "Math.cos(")
      .replace(/tan\(/g, "Math.tan(")
      .replace(/log\(/g, "Math.log(")
      .replace(/sqrt\(/g, "Math.sqrt(")
      .replace(/pi/g, "Math.PI")
      .replace(/e/g, "Math.E");
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

  // Generar datos para la gráfica
  const generarGrafica = () => {
    const puntosX = [];
    const puntosY = [];
    for (let x = an - 1; x <= bn + 1; x += 0.1) {
      puntosX.push(x);
      puntosY.push(evaluarFuncion(funcion, x));
    }
    setDatosGrafica({
      labels: puntosX.map((x) => x.toFixed(2)),
      datasets: [
        {
          label: "f(x)",
          data: puntosY,
          borderColor: "blue",
          fill: false,
        },
      ],
    });
  };

  // Función para ejecutar el método de bisección
  const ejecutarBiseccion = () => {
    setError("");
    const iteraciones = [];
    let a = parseFloat(an);
    let b = parseFloat(bn);

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

    for (let i = 0; i < numIteraciones; i++) {
      const xn = (a + b) / 2;
      const fxn = evaluarFuncion(funcion, xn);

      iteraciones.push({
        iteracion: i + 1,
        an: a,
        xn: xn,
        bn: b,
        fan: fa,
        fxn: fxn,
        fbn: fb,
      });

      if (fa * fxn < 0) {
        b = xn;
        fb = fxn;
      } else {
        a = xn;
        fa = fxn;
      }
    }
    setResultados(iteraciones);
    generarGrafica();
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
         <h1><InlineMath>{funcion}</InlineMath></h1>
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
                <th>
                  <InlineMath>aₙ</InlineMath>
                </th>
                <th>
                  <InlineMath>xₙ</InlineMath>
                </th>
                <th>
                  <InlineMath>bₙ</InlineMath>
                </th>
                <th>
                  <InlineMath>f(aₙ)</InlineMath>
                </th>
                <th>
                  <InlineMath>f(xₙ)</InlineMath>
                </th>
                <th>
                  <InlineMath>f(bₙ)</InlineMath>
                </th>
              </tr>
            </thead>
            <tbody>
              {resultados.map((iter, index) => (
                <tr key={index}>
                  <td>{iter.iteracion}</td>
                  <td>{iter.an.toFixed(4)}</td>
                  <td>{iter.xn.toFixed(4)}</td>
                  <td>{iter.bn.toFixed(4)}</td>
                  <td>{iter.fan.toFixed(4)}</td>
                  <td>{iter.fxn.toFixed(4)}</td>
                  <td>{iter.fbn.toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay resultados aún.</p>
        )}
      </div>
      <div style={{ marginTop: "20px" }}>
        <h3>Gráfica de f(x)</h3>
        {datosGrafica && <Line data={datosGrafica} />}
      </div>
    </div>
  );
}

export default Biseccion;
